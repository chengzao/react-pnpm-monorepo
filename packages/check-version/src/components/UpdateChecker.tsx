import { useState, useEffect, useCallback, useRef } from 'react';

// 类型定义
interface VersionInfo {
  version: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface UpdateCheckerProps {
  /** 检查间隔（毫秒），默认10分钟 */
  checkInterval?: number;
  /** 是否自动开始检查，默认 true */
  autoCheck?: boolean;
  /** 页面可见性变化时是否检查，默认 false */
  checkOnVisibilityChange?: boolean;
  /** 版本文件路径，默认 '/version.json' */
  versionFile?: string;
  /** 发现更新时的回调函数 */
  onUpdateAvailable?: (newVersion: string, currentVersion: string) => void;
  /** 自定义通知组件 */
  customNotification?: React.ComponentType<NotificationComponentProps>;
  /** 是否显示重新加载按钮，默认 true */
  showReloadButton?: boolean;
  /** 是否显示忽略按钮，默认 true */
  showDismissButton?: boolean;
  /** 忽略持续时间（毫秒），默认24小时 */
  dismissDuration?: number;
  /** 子组件 */
  children?: React.ReactNode | ((props: { manualCheck: () => void }) => React.ReactNode);
}

export interface NotificationComponentProps {
  /** 重新加载页面的回调函数 */
  onReload: () => void;
  /** 忽略更新的回调函数 */
  onDismiss: () => void;
  /** 是否显示重新加载按钮 */
  showReloadButton: boolean;
  /** 是否显示忽略按钮 */
  showDismissButton: boolean;
  /** 当前版本号 */
  currentVersion: string;
}

const UpdateChecker: React.FC<UpdateCheckerProps> = ({
  checkInterval = 10 * 60 * 1000, // 默认10分钟
  autoCheck = true,
  checkOnVisibilityChange = false,
  versionFile = '/version.json',
  onUpdateAvailable,
  customNotification: CustomNotification,
  showReloadButton = true,
  showDismissButton = true,
  dismissDuration = 24 * 60 * 60 * 1000, // 默认24小时
  children,
}) => {
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const isCheckingRef = useRef<boolean>(isChecking);
  const dismissDurationRef = useRef<number>(dismissDuration);

  // 同步isChecking状态到ref
  useEffect(() => {
    isCheckingRef.current = isChecking;
  }, [isChecking]);

  // 同步dismissDuration到ref
  useEffect(() => {
    dismissDurationRef.current = dismissDuration;
  }, [dismissDuration]);

  // 检查更新的主函数
  const checkForUpdate = useCallback(
    async (forceCheck: boolean = false): Promise<void> => {
      // 如果正在检查中，则跳过
      if (isCheckingRef.current && !forceCheck) return;

      // 检查是否在忽略期内
      const dismissedUntil = localStorage.getItem('updateDismissedUntil');
      if (dismissedUntil && Date.now() < parseInt(dismissedUntil) && !forceCheck) {
        return;
      }

      setIsChecking(true);

      try {
        // 添加时间戳防止缓存
        const url = `${versionFile}?t=${Date.now()}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data: VersionInfo = await response.json();

        // 检查版本是否匹配
        if (data.version && data.version !== __APP_VERSION__) {
          setUpdateAvailable(true);
          setLastCheck(new Date());
          onUpdateAvailable?.(data.version, __APP_VERSION__);
        }
      } catch (err) {
        console.error('版本检查失败:', err);
      } finally {
        setIsChecking(false);
      }
    },
    [versionFile, onUpdateAvailable],
  );

  // 忽略更新
  const dismissUpdate = useCallback((): void => {
    setUpdateAvailable(false);
    if (dismissDurationRef.current > 0) {
      const dismissedUntil = Date.now() + dismissDurationRef.current;
      localStorage.setItem('updateDismissedUntil', dismissedUntil.toString());
    }
  }, []);

  // 立即刷新页面
  const reloadPage = useCallback((): void => {
    window.location.reload();
  }, []);

  // 手动触发检查（暴露给子组件使用）
  const manualCheck = useCallback((): void => {
    checkForUpdate(true);
  }, [checkForUpdate]);

  // 设置定时检查
  useEffect(() => {
    if (!autoCheck) return;

    const intervalId = setInterval(checkForUpdate, checkInterval);

    // 首次加载时立即检查一次
    checkForUpdate();

    return () => clearInterval(intervalId);
  }, [autoCheck, checkInterval, checkForUpdate]);

  // 页面可见性变化时检查
  useEffect(() => {
    if (!checkOnVisibilityChange) return;

    const handleVisibilityChange = (): void => {
      if (!document.hidden) {
        checkForUpdate();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [checkOnVisibilityChange, checkForUpdate]);

  // 如果使用自定义通知组件
  if (CustomNotification && updateAvailable) {
    return (
      <>
        {children}
        <CustomNotification
          onReload={reloadPage}
          onDismiss={dismissUpdate}
          showReloadButton={showReloadButton}
          showDismissButton={showDismissButton}
          currentVersion={__APP_VERSION__}
        />
      </>
    );
  }

  // 渲染子组件并传递手动检查方法
  const renderChildren = (): React.ReactNode => {
    if (typeof children === 'function') {
      return (children as (props: { manualCheck: () => void }) => React.ReactNode)({ manualCheck });
    }
    return children;
  };

  return (
    <>
      {renderChildren()}

      {/* 默认更新通知弹窗 */}
      {updateAvailable && (
        <div className="update-notification">
          <div className="update-notification__content">
            <h3>发现新版本</h3>
            <p>为了您更好的体验，我们已升级系统。请刷新页面以加载最新版本。</p>

            <div className="update-notification__actions">
              {showReloadButton && (
                <button
                  className="update-notification__button update-notification__button--primary"
                  onClick={reloadPage}
                  disabled={isChecking}
                >
                  {isChecking ? '检查中...' : '立即刷新'}
                </button>
              )}

              {showDismissButton && (
                <button
                  className="update-notification__button update-notification__button--secondary"
                  onClick={dismissUpdate}
                  disabled={isChecking}
                >
                  稍后提醒
                </button>
              )}
            </div>

            {lastCheck && <div className="update-notification__meta">最后检查: {lastCheck.toLocaleTimeString()}</div>}
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateChecker;

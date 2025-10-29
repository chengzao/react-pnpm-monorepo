// src/App.tsx
import React, { useState } from 'react';
import UpdateChecker from './components/UpdateChecker';

const App: React.FC = () => {
  const [lastCheckTime, setLastCheckTime] = useState<Date | null>(null);

  return (
    <div className="app">
      <h1>手动检查示例</h1>

      <UpdateChecker
        // 禁用自动检查
        autoCheck={false}
        checkOnVisibilityChange={false}
      >
        {({ manualCheck }) => (
          <div
            style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              margin: '20px 0',
            }}
          >
            <h3>版本检查控制台</h3>
            <p>
              当前版本: <code>{__APP_VERSION__}</code>
            </p>
            <p>最后检查时间: {lastCheckTime ? lastCheckTime.toLocaleTimeString() : '尚未检查'}</p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button
                onClick={() => {
                  manualCheck();
                  setLastCheckTime(new Date());
                }}
                style={{
                  background: '#1890ff',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                立即检查更新
              </button>

              <button
                onClick={() => {
                  // 模拟版本更新
                  localStorage.removeItem('updateDismissedUntil');
                  manualCheck();
                  setLastCheckTime(new Date());
                }}
                style={{
                  background: '#52c41a',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                强制检查（忽略缓存）
              </button>
            </div>
          </div>
        )}
      </UpdateChecker>

      <div>
        <h2>使用说明</h2>
        <ul>
          <li>点击"立即检查更新"进行版本检查</li>
          <li>点击"强制检查"会忽略本地缓存进行强制检查</li>
          <li>检查结果会显示在页面顶部的通知中</li>
        </ul>
      </div>
    </div>
  );
};

export default App;

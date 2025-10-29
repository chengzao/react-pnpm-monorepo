import UpdateChecker from './components/UpdateChecker';
import './styles/update-checker.css';
import CustomUpdateNotification from './components/CustomUpdateNotification';

// import ManualCheck from './manualCheck';

function App() {
  return (
    <>
      <div>
        <h1>我的应用</h1>
        <p>当前版本: {__APP_VERSION__}</p>
        {/* <UpdateChecker
          checkInterval={ 60 * 1000} // 30分钟检查一次
          checkOnVisibilityChange={true} // 保持可见性检查
          dismissDuration={4 * 60 * 60 * 1000} // 忽略4小时
        /> */}

        <UpdateChecker
          autoCheck={false}
          customNotification={CustomUpdateNotification}
          checkInterval={10 * 60 * 1000}
          onUpdateAvailable={(newVersion, currentVersion) => {
            console.log(`✨ 自定义通知: 从 ${currentVersion} 更新到 ${newVersion}`);
          }}
        />

        {/* <ManualCheck /> */}
      </div>
    </>
  );
}

export default App;

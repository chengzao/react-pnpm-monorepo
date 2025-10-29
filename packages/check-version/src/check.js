// 版本检查函数
async function checkForUpdate() {
  try {
    // 建议禁用缓存以确保获取到最新的版本信息[citation:2]
    const res = await fetch('/version.json?t=' + Date.now());
    const data = await res.json();

    if (data.version && data.version !== __APP_VERSION__) {
      // 如果版本不一致，触发更新提示
      showUpdateNotification();
    }
  } catch (error) {
    console.log('版本检查失败:', error);
  }
}

// 显示更新提示
function showUpdateNotification() {
  // 这里可以展示一个模态框，提示用户刷新页面[citation:2]
  if (confirm('发现新版本，是否立即刷新以获取最新内容？')) {
    location.reload();
  }
}

// 可以定时检查（例如每10分钟）[citation:2]，或者在页面显示时检查
setInterval(checkForUpdate, 10 * 60 * 1000);

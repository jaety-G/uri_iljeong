// 우리 일정 — Windows 앱 껍데기 (Electron)
// 화면과 동작은 모두 app/index.html 에 있어요. 이 파일은 창을 띄우고 업데이트를 확인하는 일만 해요.
const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');
const fs = require('fs');

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  let win = null;

  const openOutside = (url) => { if (/^https?:\/\//.test(url)) shell.openExternal(url); };

  function createWindow() {
    win = new BrowserWindow({
      width: 1180,
      height: 900,
      minWidth: 380,
      minHeight: 560,
      backgroundColor: '#FAF6EA',
      title: '우리 일정',
      icon: path.join(__dirname, 'build', 'icon.png'),
      autoHideMenuBar: true,
      show: false,
      webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true },
    });
    win.once('ready-to-show', () => win.show());
    win.loadFile(path.join(__dirname, 'app', 'index.html'));

    // 앱 밖의 주소는 기본 브라우저로 열기
    win.webContents.setWindowOpenHandler(({ url }) => { openOutside(url); return { action: 'deny' }; });
    win.webContents.on('will-navigate', (e, url) => {
      if (!url.startsWith('file:')) { e.preventDefault(); openOutside(url); }
    });
  }

  // 이미 켜져 있으면 새로 띄우지 않고 그 창을 앞으로
  app.on('second-instance', () => {
    if (!win) return;
    if (win.isMinimized()) win.restore();
    win.focus();
  });

  // GitHub에 새 버전이 올라오면 내려받아 두었다가, 다음에 앱을 켤 때 바뀌어요.
  function checkForUpdates() {
    if (!app.isPackaged) return;
    if (!fs.existsSync(path.join(process.resourcesPath, 'app-update.yml'))) return; // 직접 빌드한 파일은 건너뜀
    try {
      const { autoUpdater } = require('electron-updater');
      autoUpdater.checkForUpdatesAndNotify().catch(() => {});
    } catch (e) { /* 업데이트 확인 실패는 무시 */ }
  }

  app.whenReady().then(() => {
    Menu.setApplicationMenu(null);
    createWindow();
    checkForUpdates();
  });

  app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
}

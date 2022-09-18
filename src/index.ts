import { app, BrowserWindow, globalShortcut } from 'electron';
import { overlayWindow } from 'electron-overlay-window';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

app.disableHardwareAcceleration();

let window: BrowserWindow;

const createWindow = (): void => {
  window = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    alwaysOnTop: true,
    autoHideMenuBar: true,
    frame: false,
    transparent: true,
    fullscreenable: false,
    resizable: false,
    ...overlayWindow.WINDOW_OPTS
  });

  window.setIgnoreMouseEvents(true)

  makeDemoInteractive()

  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  overlayWindow.attachTo(window, 'Star Citizen')
};


function makeDemoInteractive () {
  let isIntractable = false
  let isVisible = true

  function toggleOverlayState () {
    if (isIntractable) {
      window.setIgnoreMouseEvents(true)
      isIntractable = false
      overlayWindow.focusTarget()
      window.webContents.send('focus-change', false)
    } else {
      window.setIgnoreMouseEvents(false)
      isIntractable = true
      overlayWindow.activateOverlay()
      window.webContents.send('focus-change', true)
    }
  }

  globalShortcut.register('CmdOrCtrl + Shift + I', toggleOverlayState);

  globalShortcut.register('CmdOrCtrl + Shift + V', () => {
    isVisible = !isVisible;
    window.webContents.send('visibility-change', isVisible);
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

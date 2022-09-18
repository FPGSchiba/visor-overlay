import { app, BrowserWindow, globalShortcut } from 'electron';
import { overlayWindow } from 'electron-overlay-window';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

app.disableHardwareAcceleration();

let window: BrowserWindow;

const createWindow = (): void => {
  window = new BrowserWindow({
    height: 900,
    width: 500,
    webPreferences: {
      nodeIntegration: true
    },
    ...overlayWindow.WINDOW_OPTS,
  });

  window.webContents.openDevTools({ mode: 'detach', activate: false });

  window.setIgnoreMouseEvents(false);

  makeDemoInteractive();

  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  overlayWindow.attachTo(window, 'Star Citizen')
};


function makeDemoInteractive () {
  let isIntractable = true;
  let isVisible = true;

  function toggleOverlayState () {
    if (isIntractable) {
      window.setIgnoreMouseEvents(true);
      isIntractable = false;
      overlayWindow.focusTarget();
      window.webContents.send('focus-change', false);
    } else {
      window.setIgnoreMouseEvents(false);
      isIntractable = true;
      overlayWindow.activateOverlay();
      window.webContents.send('focus-change', true);
    }
  }

  globalShortcut.register('Alt+I', toggleOverlayState);

  globalShortcut.register('Alt+V', () => {
    if (isVisible) {
      window.hide();
    } else {
      window.show();
    }
    isVisible = !isVisible;
  })
}

app.on('ready', () => {
  setTimeout(
    createWindow,
    process.platform === 'linux' ? 1000 : 0 // https://github.com/electron/electron/issues/16809
  )
});
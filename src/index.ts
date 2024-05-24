import { app, BrowserWindow, globalShortcut, ipcMain, autoUpdater, dialog, Menu, Tray } from 'electron';

import { overlayWindow } from 'electron-overlay-window';
import path from 'path';
import * as fs from 'fs';
import MessageBoxOptions = Electron.MessageBoxOptions;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

if (require('electron-squirrel-startup')) {
  app.quit();
}

app.disableHardwareAcceleration();

let window: BrowserWindow;
let tray: Tray = null
let isIntractable = true;
let isVisible = true;

const server = 'https://visor-updater.vercel.app/' 
const url = `${server}/update/${process.platform}/${app.getVersion()}`
autoUpdater.setFeedURL({ url })

const UPDATE_CHECK_INTERVAL = 10 * 60 * 1000
setInterval(() => {
  autoUpdater.checkForUpdates()
}, UPDATE_CHECK_INTERVAL)

const createWindow = (): void => {
  window = new BrowserWindow({
    height: 900,
    width: 500,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },
    ...overlayWindow.WINDOW_OPTS,
  });

  window.webContents.openDevTools({ mode: 'detach', activate: true });

  window.setIgnoreMouseEvents(false);

  overlayWindow.attachTo(window, 'Star Citizen')

  makeDemoInteractive();

  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

function toggleOverlayState (): void {
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

function getContextMenu() {
  return Menu.buildFromTemplate([
    { label: isIntractable ? 'Disable' : 'Enable', type: 'normal', click: () => { toggleOverlayState(); tray.setContextMenu(getContextMenu()); } },
    { label: isVisible ? 'Hide' : 'Show', type: 'normal', click: () => {
        if (isVisible) {
          window.hide();
        } else {
          window.show();
        }
        isVisible = !isVisible;
        tray.setContextMenu(getContextMenu());
      } },
    { label: 'Exit', type: 'normal', click: () => app.quit() }
  ])
}

app.whenReady().then(() => {
  //add your path
  tray = new Tray(path.join(app.getAppPath(), 'src', 'resources', 'logo.png'))
  const contextMenu = getContextMenu();
  tray.setToolTip('Vanguard VISOR')
  tray.setContextMenu(contextMenu)
})

function makeDemoInteractive () {
  overlayWindow.activateOverlay();

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


function getDataDir() {
  const dataDir =  path.join(process.env.APPDATA, 'visor-overlay');
  fs.access(dataDir, (error) => {
    if (error) {
      fs.mkdir(dataDir, (error) => {
        if (error) {
          console.error(error);
          return '';
        }
      });
    }
  });
  return dataDir;
}
 
ipcMain.on('saveLogin', (event, user: {userToken: string, orgToken: string}) => {
  const loginFile = path.join(getDataDir(), 'login.json');

  fs.writeFile(loginFile, JSON.stringify(user), (error) => {
    if (error) {
      console.error(error);
    }
  });
})

ipcMain.on('hasLoginFile', (event) => {
  const loginFile = path.join(getDataDir(), 'login.json');

  fs.access(loginFile, (error) => {
    if (error) {
      event.returnValue = false;
    } else {
      event.returnValue = true;
    }
  })
});

ipcMain.on('getLoginFromFile', (event) => {
	const loginFile = path.join(getDataDir(), 'login.json');

	fs.readFile(loginFile, { encoding: 'utf-8'}, (err: NodeJS.ErrnoException, data: Buffer) => {
		if (!err) {
			event.returnValue = JSON.parse(data.toString());
		} else {
			console.error(err);
			event.returnValue = {};
		}
	})
});

ipcMain.on('removeLoginFile', (event) => {
	const loginFile = path.join(getDataDir(), 'login.json');

	fs.rm(loginFile, (err: NodeJS.ErrnoException) => {
		if (err) {
			console.error(err);
      event.returnValue = false;
		} else {
      event.returnValue = true;
    }
	})
});

autoUpdater.on('error', (message) => {
  console.error('There was a problem updating the application')
  console.error(message)
})

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts: MessageBoxOptions = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }
  dialog.showMessageBox(window, dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})
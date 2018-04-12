import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import installExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';

let mainWindow: Electron.BrowserWindow | null;

function createWindow () {
  mainWindow = new BrowserWindow({
    frame: process.platform !== 'darwin',
    height: 600,
    width: 800,
    minHeight : 600,
    minWidth : 800,
    show: false,
    titleBarStyle: process.platform === 'darwin' ? 'hidden' : 'hidden-inset',
    webPreferences: {
      webSecurity: false,
    },
  });

  mainWindow.loadURL(process.env.WATCH ? 'http://localhost:8080' :
    url.format({
      pathname: path.resolve(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    },
  ));

  if ( process.env.NODE_ENV === 'development' ) {
    [REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS].forEach((extension) => {
      installExtension(extension)
        /* tslint:disable: no-console */
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
        /* tslint:disable: no-console */
    });
  }

  mainWindow.once('ready-to-show', () => {
    if ( mainWindow !== null ) {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { existsSync, writeFileSync, readFileSync } from 'fs'

const readmePath = path.join(app.getPath('desktop'), 'readme.json')
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
      
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (app.isPackaged) {
    win.loadURL(`file://${__dirname}/../index.html`);
  } else {
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();    
  }

  ipcMain.on('create-readme', (e) => {
    writeFileSync(readmePath, '{}')
    sendReadme(e)
  })

  ipcMain.on('get-readme', (e) => {
    if (!existsSync(readmePath)) {
      e.sender.send('readme-not-found')
      return
    }
    sendReadme(e)
  })

  ipcMain.on('update-readme', (e, data: string) => {
    writeFileSync(readmePath, data)
    sendReadme(e)
  })
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
});


function sendReadme(e: Electron.IpcMainEvent) {
  e.sender.send('readme', JSON.parse(readFileSync(readmePath, {encoding: 'utf-8'})) )
}
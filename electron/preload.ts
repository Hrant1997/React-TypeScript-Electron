import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('api', {
  getReadme: () => ipcRenderer.send('get-readme'),
  createReadme: () => ipcRenderer.send('create-readme'),
  updateReadme: (data: string) => ipcRenderer.send('update-readme', data),
  handleReadme: (callback: (arg: string) => void) => {ipcRenderer.on('readme', (_, readmeData) => { callback(JSON.stringify(readmeData, null, 4)) })},
  handleReadmeNotFound: (callback: () => void) => {ipcRenderer.on('readme-not-found', () => { callback() })}
});
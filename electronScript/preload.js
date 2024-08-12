// preload.js

const { contextBridge, ipcRenderer  } = require("electron");


contextBridge.exposeInMainWorld('api', {
  getSources: () => ipcRenderer.invoke('get-windows'),

  setSourceID: (sourceID) => ipcRenderer.send('set-sourceID', sourceID),
  getSourceID: () => ipcRenderer.invoke('get-sourceID'),

  setFPS: (FPS) => ipcRenderer.send('set-FPS', FPS),
  getFPS: () => ipcRenderer.invoke('get-FPS'),

  setServer: (address) => ipcRenderer.send('set-Server', address),
  pingServer: (address) => ipcRenderer.invoke('ping-Server', address),

  openVideoPage: () => ipcRenderer.send('open-video-page'),
  closeVideoPage: () => ipcRenderer.send('close-video-page'),

  setFilter: (msg) => ipcRenderer.on('set-filter', msg),

  onVideoWindowClosed: (callback) => ipcRenderer.on('video-window-closed', callback)

});
// main.js
const {Menu, app, BrowserWindow, desktopCapturer, globalShortcut , ipcMain } = require('electron')
const path = require('path');
const Client = require('./client');

//TODO rajouter commande avec un toggle pour les affichers ou non

let mainWindow;
let videoWindow;
let sourceID;
let FPS;
let ServerAddress;




app.whenReady().then(async () => {
  

  mainWindow = new BrowserWindow({
    width: 420,
    height: 665,
    icon: path.join(__dirname, 'assets', 'VisionFilter-logo_without-text.png'),
    resizable: false,
    autoHideMenuBar: true,
    maximizable: false, 
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, 'electronScript','preload.js'), 
      contextIsolation: true,
      nodeIntegration: false 
    }
  });

  //mainWindow.webContents.openDevTools(); // Ouvre les outils de développement
  Menu.setApplicationMenu(null); //disable menu bar 

  mainWindow.loadFile(path.join(__dirname,'./HTML/previewPage.html'));

  mainWindow.on('closed', () => {
    mainWindow=null;
    globalShortcut.unregisterAll();
    closeVideoPage();
  });

  



  //====================================================================//
  //====================================================================//
  
  let sources;

  //ask all windows
  ipcMain.handle('get-windows', async () => {
    sources = await desktopCapturer.getSources({ types: ['window'] }).then((sources) => {
      
      // Grant access to the first screen found.
      return sources;
    }).catch(e => {
      console.log(e);
      return sources
    });

    return sources;
  });


  //--------------------------------------------------------------------//
  //--------------------------------------------------------------------//
  ipcMain.handle('get-sourceID', ()=>{
    if(sourceID){
      return sourceID;
    }
    return;
  });

  ipcMain.on('set-sourceID', (Event, newSourceID)=>{
    sourceID = newSourceID;
  });

  //--------------------------------------------------------------------//
  //--------------------------------------------------------------------//
  ipcMain.handle('get-FPS', ()=>{
    if(FPS){
      return FPS;
    }
    return;
  });

  ipcMain.on('set-FPS', (Event, newFPS)=>{
    FPS = newFPS;
  });

  //--------------------------------------------------------------------//
  //--------------------------------------------------------------------//
  
  ipcMain.on('set-Server', (Event, newServerAddress)=>{
    ServerAddress = newServerAddress;
  });

  ipcMain.handle('ping-Server', async (Event, newServerAddress)=>{
    const clientTest = new Client(newServerAddress);
    const result = await clientTest.ping();
    return result;

  });

  //--------------------------------------------------------------------//
  //--------------------------------------------------------------------//
  ipcMain.on('open-video-page',async ()=>{
    //mainWindow.minimize();
    
    if(!videoWindow){
      console.log("Newpage")
      await creatVideoPage();

      videoWindow.webContents.send('receive-video-stream',sourceID);
    }
  })

  ipcMain.on('close-video-page',()=>{
    
    closeVideoPage();
  })

  //====================================================================//
  //====================================================================//
  //SHORTCUT
  globalShortcut.register('alt+num0', () => {
    if (videoWindow) {
      closeVideoPage();
    }
  });

  globalShortcut.register('alt+num1', () => {
    if (videoWindow) {
      videoWindow.setAlwaysOnTop(!videoWindow.isAlwaysOnTop());
    }
  });


  //FILTER
  /*
  globalShortcut.register('alt+num2', () => {
    if (videoWindow) {
      videoWindow.webContents.send('set-filter',"pixelate")
    }
  });

  globalShortcut.register('alt+num3', () => {
    if (videoWindow) {
      videoWindow.webContents.send('set-filter',"blur")
    }
  });

  globalShortcut.register('alt+num4', () => {
    if (videoWindow) {
      videoWindow.webContents.send('set-filter',"shake")
    }
  });

  globalShortcut.register('alt+num5', () => {
    if (videoWindow) {
      videoWindow.webContents.send('set-filter',"mirror")
    }
  });

  globalShortcut.register('alt+num6', () => {
    if (videoWindow) {
      videoWindow.webContents.send('set-filter',"grey")
    }
  });

  globalShortcut.register('alt+num7', () => {
    if (videoWindow) {
      videoWindow.webContents.send('set-filter',"invert")
    }
  });

  globalShortcut.register('alt+num8', () => {
    if (videoWindow) {
      videoWindow.webContents.send('set-filter',"wave")
    }
  });

  globalShortcut.register('alt+num9', () => {
    if (videoWindow) {
      videoWindow.webContents.send('set-filter',"zoomOut")
    }
  });
  

  globalShortcut.register('alt+num8', () => {
    if (videoWindow) {
      videoWindow.webContents.send('set-filter',["lag",10000])
    }
  });
  globalShortcut.register('alt+num9', () => {
    if (videoWindow) {
      videoWindow.webContents.send('set-filter',["blink",10000])
    }
  });
  */

})


function applyFilter(Filter){
  if (videoWindow) {
    videoWindow.webContents.send('set-filter',Filter)
  }
}


//====================================================================//
//====================================================================//
//Video page
let client;
function closeVideoPage(){
  if(client){
    client.disconnect();
    client=null;
  }

  if(videoWindow){
    videoWindow.close();
  }

  ServerAddress=null;
}

async function creatVideoPage(){
  client = new Client(ServerAddress)
  client.init(applyFilter);
  
  if(!videoWindow){
    videoWindow = new BrowserWindow({
      icon: path.join(__dirname, 'assets', 'VisionFilter-logo_without-text.png'),
      resizable: true,
      fullscreen: true,
      alwaysOnTop: true,
      maximizable: true, 
      autoHideMenuBar: true,
      hasShadow: false,
      webPreferences: {
        preload: path.join(__dirname, 'electronScript','preload.js'), 
        contextIsolation: true, 
        nodeIntegration: false,
        backgroundThrottling: false
      }
    });

    //videoWindow.webContents.openDevTools(); 
    videoWindow.setIgnoreMouseEvents(true, { forward: true });


    videoWindow.on('closed', () => {
      videoWindow=null;
      if(mainWindow){
        mainWindow.webContents.send("video-window-closed");
      }
      //mainWindow.restore();
    });


    
    videoWindow.loadFile(path.join(__dirname,'./HTML/videoPage.html'));
  }
}

//====================================================================//
//====================================================================//

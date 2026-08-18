const {app, BrowserWindow, ipcMain} = require('electron/main')
const path = require('node:path')
const retrieve = require('./service/retrieve')
var currentNoteIndex = 0;

async function handleNextNote(){
  const files = await retrieve.listFiles()
  if(files.length > currentNoteIndex +1){
    currentNoteIndex++
    const note = await retrieve.readFile(files[currentNoteIndex])
    return note
  } else{
    return null
  }
}

async function handlePreviousNote(){
  if(currentNoteIndex === 0){
    return null
  }
  const files = await retrieve.listFiles()
  if(files.length > 0 ){
    currentNoteIndex--
    const note = await retrieve.readFile(files[currentNoteIndex])
    return note
  } else{
    return null
  }
}
function createWindow(){
  const mainWindow = new BrowserWindow({
    webPreferences:{
      preload: path.join(__dirname,'preload.js')
    }
  })


mainWindow.loadFile('index.html')
mainWindow.webContents.on('did-finish-load',async ()=>{
  const files = await retrieve.listFiles()
  if(files.length >0){
    const firstNote = await retrieve.readFile(files[0])
    if(firstNote !== null){
    mainWindow.webContents.send('first-note',firstNote)
    }
  }
})
mainWindow.webContents.openDevTools()
}

app.whenReady().then(()=>{
  ipcMain.handle('next-note', handleNextNote)
  ipcMain.handle('previous-note', handlePreviousNote)
  createWindow()
  app.on('activate',function(){
    if(BrowserWindow.getAllWindows().length === 0) createWindow()
  }) 
})

app.on('window-all-closed',function () {
  if(process.platform !== 'darwin') app.quit()
})
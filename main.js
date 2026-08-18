const {app, BrowserWindow,dialog, ipcMain} = require('electron/main')
const path = require('node:path')
const retrieve = require('./service/retrieve')
var currentNoteIndex = 0;

async function handleNextNote(){
  const files = await retrieve.listFiles()
  if(files.length > currentNoteIndex +1){
    currentNoteIndex++
    const note = await retrieve.readFile(files[currentNoteIndex])
    const title = files[currentNoteIndex]
    return {note : note,
      title: title}
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
    const title = files[currentNoteIndex]
    return {note : note,
      title: title}
  } else{
    return null
  }
}
function createWindow(){
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 200,
    frame: false,
    webPreferences:{
      preload: path.join(__dirname,'preload.js')
    }
  })


mainWindow.loadFile('index.html')
mainWindow.webContents.on('did-finish-load',async ()=>{
  const result = await dialog.showOpenDialog(mainWindow,{propetries:['openFile','openDirectory']})
  console.log(result)
  const files = await retrieve.listFiles()
  if(files.length >0){
    const firstNote = await retrieve.readFile(files[0])
    if(firstNote !== null){
      const obj = {note: firstNote, title: files[0]}
    mainWindow.webContents.send('first-note',obj)
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
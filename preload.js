const {contextBridge, ipcRenderer} = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI',{
    onFirstNoteLoaded: (callback) => ipcRenderer.on('first-note', (_event,value) => callback(value)),
    nextNote: ()=> ipcRenderer.invoke('next-note'),
    previousNote: ()=>ipcRenderer.invoke('previous-note')   
})
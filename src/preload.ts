import { contextBridge, ipcRenderer } from 'electron'

console.log('preload')

contextBridge.exposeInMainWorld('api', {
  shortcutRefresh: (shortcuts: any) => {
    ipcRenderer.invoke('shortcutRefresh', shortcuts)
  }
})
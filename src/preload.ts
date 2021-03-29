import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  setShortcuts: (shortcuts: any) => {
    ipcRenderer.invoke('setShortcuts', shortcuts)
  }
})
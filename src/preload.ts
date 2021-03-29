import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  shortcutRefresh: (shortcuts: any) => {
    ipcRenderer.invoke('shortcutRefresh', shortcuts)
  }
})
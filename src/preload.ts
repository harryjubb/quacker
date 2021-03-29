import { contextBridge, ipcRenderer } from 'electron'
import { Shortcut } from './types'

contextBridge.exposeInMainWorld('api', {
  setShortcuts: (shortcuts: Shortcut[]) => {
    ipcRenderer.invoke('setShortcuts', shortcuts)
  },
  handleInitialShortcuts: (handler: any) => {
    ipcRenderer.on('initialShortcuts', (event, initialShortcuts) => {
      handler(initialShortcuts)
    })
  }
})
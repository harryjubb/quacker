import { contextBridge, ipcRenderer } from 'electron'
import { SetShortcuts, Shortcut } from './types'

contextBridge.exposeInMainWorld('api', {
  setShortcuts: (shortcuts: Shortcut[]) => {
    ipcRenderer.invoke('setShortcuts', shortcuts)
  },
  handleInitialShortcuts: (handler: SetShortcuts) => {
    ipcRenderer.on('initialShortcuts', (event, initialShortcuts: Shortcut[]) => {
      handler(initialShortcuts)
    })
  }
})
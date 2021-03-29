import { contextBridge, ipcRenderer } from 'electron'
import { Shortcut } from './types'

contextBridge.exposeInMainWorld('api', {
  setShortcuts: (shortcuts: Shortcut[]) => {
    ipcRenderer.invoke('setShortcuts', shortcuts)
  }
})
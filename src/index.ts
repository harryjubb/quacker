import fs from 'fs'
import vm from 'vm'
import { app, dialog, session, BrowserWindow, Menu, Tray, globalShortcut, ipcMain, Notification, shell } from 'electron'
import settings from 'electron-settings'
import robot from 'robotjs'
import { Shortcut } from './types'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit()
}

/** Flag to check if we're genuinely quitting the app or just closing the window */
let willQuit = false

const createWindow = async (): Promise<void> => {
  // Set up Content Security Policy
  // session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  //   callback({
  //     responseHeaders: {
  //       ...details.responseHeaders,
  //       'Content-Security-Policy': ['default-src \'none\'']
  //     }
  //   })
  // })

  const windowSession = session.fromPartition('persist:quacker')
  
  // Disable all browser permissions
  windowSession.setPermissionRequestHandler((webContents, permission, callback) => {
    return callback(false)
  })

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    icon: './img/1F986_black_filled.png',
    webPreferences: {
      session: windowSession,
      contextIsolation: true,
      sandbox: true,
      disableBlinkFeatures: 'Auxclick',
      webSecurity: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  // Prevent closure of the window: hide it instead
  // so that the taskbar icon can bring it back
  mainWindow.on('close', event => {
    if (!willQuit) {
      event.preventDefault()
      mainWindow.hide()
    }
  })
  
  mainWindow.maximize()
  
  // Limit navigation
  const navigateHandler = (event: Electron.Event, newUrl: string) => {
    const hostname = new URL(newUrl).hostname
    const allowedHosts = [
      'www.electronjs.org'
    ]
    if (allowedHosts.includes(hostname)) {
      shell.openExternal(newUrl)
    }
    event.preventDefault()
  }
  
  mainWindow.webContents.on('will-navigate', navigateHandler)
  mainWindow.webContents.on('new-window', navigateHandler)
  
  // Load the index.html of the app.
  await mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  
  mainWindow.webContents.send('initialShortcuts', await(settings.get('shortcuts')) ?? [])

  app.on('before-quit', () => {
    willQuit = true
  })

  const tray = new Tray('./src/img/1F986_black_filled_16x16.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show Quacker', type: 'normal', 'click': () => {
      mainWindow.show()
      app.dock.show()
    }},
    { label: 'Hide Quacker', type: 'normal', 'click': () => {
      mainWindow.hide()
      app.dock.hide()
      new Notification({title: 'Quack!', body: 'Quacker is still listening for your shortcuts in the background'}).show()
    }},
    { type: 'separator' },
    { label: 'Quit', type: 'normal', 'click': () => {
      willQuit = true
      app.quit()
    } },
  ])
  tray.setToolTip('Quacker')
  tray.setContextMenu(contextMenu)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.handle('setShortcuts', (event, shortcuts) => {
  globalShortcut.unregisterAll()
  shortcuts.forEach((shortcut: Shortcut) => {
    try { 
      const ret = globalShortcut.register(shortcut.shortcut, () => {
        console.log(`${shortcut.shortcut} called!`)
        const secrets = JSON.parse(shortcut.secrets)
        const context = { secrets, robot, shell, Notification }
        vm.createContext(context);
        vm.runInContext(shortcut.action, context)
      })
      if (!ret) {
        console.error('Shortcut registration failed')
      }
    } catch (error) {
      console.error(`Error converting ${shortcut.shortcut}:`, error)
    }
  })
  // FIXME: Possible race condition for multiple calls in quick succession
  settings.set('shortcuts', shortcuts)
})

ipcMain.handle('exportShortcuts', async (event, shortcuts: Shortcut[]) => {
  const exportData = JSON.stringify({
    shortcuts: shortcuts.map(shortcut => ({
      ...shortcut,
      // Strip secret values
      secrets: Object.fromEntries(
        Object.entries(JSON.parse(shortcut.secrets)).map(([key, value]: [string, unknown]) => [key, ''])
      )
    }))
  })

  const timestamp = new Date().toISOString().replace(/:/g, '').replace(/\+/g, '-')

  const defaultPath = `quacker_export_${timestamp}.json`

  const save = await dialog.showSaveDialog({
    defaultPath
  })

  if (save.canceled) {
    return
  }

  if (save.filePath) {
    fs.writeFile(save.filePath, exportData, (error) => {
      let notification = null
      if (error) {
        notification = {title: "Export error", body: `Unable to export: ${error.message}`}
      } else {
        notification = {title: "Export successful", body: `Exported to ${save.filePath}`}
      }
      new Notification(notification).show()
      app.dock.bounce()
    })
  }
})

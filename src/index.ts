import vm from 'vm'
import { app, session, BrowserWindow, globalShortcut, ipcMain, Notification } from 'electron'
declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit()
}

const createWindow = (): void => {
  // Set up Content Security Policy
  // session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  //   callback({
  //     responseHeaders: {
  //       ...details.responseHeaders,
  //       'Content-Security-Policy': ['default-src \'none\'']
  //     }
  //   })
  // })

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      disableBlinkFeatures: 'Auxclick',
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  // Limit navigation
  mainWindow.webContents.on('will-navigate', event => {
    event.preventDefault()
  })
  
  mainWindow.webContents.on('new-window', event => {
    event.preventDefault()
  })

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
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
ipcMain.handle('shortcutRefresh', (event, arg) => {
  console.log("event", event)
  console.log("arg", arg)
  globalShortcut.unregisterAll()
  arg.forEach((shortcut: any) => {
    try { 
      const ret = globalShortcut.register(shortcut.shortcut, () => {
        console.log(`${shortcut.shortcut} called!`)
        console.log(Notification)
        const context = { Notification }
        vm.createContext(context);

        vm.runInContext(shortcut.action, context)
      })
      if (!ret) {
        console.log('registration failed')
      }
    } catch (error) {
      console.log(`Error converting ${shortcut.shortcut}:`, error)
    }
  })
})
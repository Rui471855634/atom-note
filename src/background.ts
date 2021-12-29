'use strict'

import { app, protocol, BrowserWindow, Menu, MenuItem, globalShortcut } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path'
const isDevelopment = process.env.NODE_ENV !== 'production'

// 主window
let mainWindow: BrowserWindow | null = null

const resolve = (pathStr: string) => {
  return path.join(__dirname, pathStr)
}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    show: false,
    width: process.env.NODE_ENV !== 'production' ? 1400 : 960,
    height: 700,
    webPreferences: {
      // preload 预加载，在window创建后和h5内容加载之前被调用
      preload: resolve('../server/preload.ts'),
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration直译为node一体化，意思是在渲染进程中可以使用Node API
      // Electron5.x以上版本，由于安全性限制，默认无法在渲染进程中调用Node API，如需使用，需要预先设置。个人猜测是为预防XSS攻击
      nodeIntegration: (process.env
          .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      // 虽然预加载脚本与其所附加的渲染器在全局共享着一个 window 变数，但您并不能从中直接附加任何变数到 window 之中，因为 contextIsolation 是默认的。
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  mainWindow = win
  win.on('ready-to-show', () => {
    win.show()
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  // 快捷键设置
  // const menu = new Menu()
  // menu.append(new MenuItem({
  //   label: 'AtomNote',
  //   submenu: [{
  //     role: 'hide',
  //     accelerator: 'CommandOrControl+Shift+I'
  //     // click: 
  //   }]
  // }))
  // Menu.setApplicationMenu(menu)
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e: any) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  // 全局快捷键
  await globalShortcut.register('CommandOrControl+Shift+E', () => {
    mainWindow?.show()
  })
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

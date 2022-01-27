import { BrowserWindow, ipcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron"
import { WIN_MAXIMIZE, WIN_UNMAXIMIZE, WIN_MINIMIZE, WIN_CLOSE, WIN_IS_MAXIMIZE } from '../constants/ipc'
import { getWindow } from './utils'

export const bindWindowsEvent = (win: BrowserWindow) => {
  // 是否最大化
  ipcMain.handle(WIN_IS_MAXIMIZE, (evt: IpcMainInvokeEvent) => {
    let _win = getWindow(evt)
    let isMaximize = _win?.isMaximized()
    return isMaximize
    // return _win?.isMaximized()
  })
  // 最小化
  ipcMain.on(WIN_MINIMIZE, (evt: IpcMainEvent) => {
    getWindow(evt)?.minimize()
  })
  // 最大化
  ipcMain.on(WIN_MAXIMIZE, (evt: IpcMainEvent) => {
    getWindow(evt)?.maximize()
  })
  // 取消最大化
  ipcMain.on(WIN_UNMAXIMIZE, (evt: IpcMainEvent) => {
    getWindow(evt)?.unmaximize()
  })
  // 关闭
  ipcMain.on(WIN_CLOSE, (evt: IpcMainEvent) => {
    getWindow(evt)?.hide()
  })
}
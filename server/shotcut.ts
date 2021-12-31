import { BrowserWindow, globalShortcut } from "electron"
import { FOCUS_INPUT } from "../constants/ipc"

export default class Shotcut {
  mainWindow: BrowserWindow | null
  constructor(mainWindow: BrowserWindow | null) {
    this.mainWindow = mainWindow
  }

  public bind() {
    // 全局快捷键
    globalShortcut.register('CommandOrControl+Shift+E', () => {
      this.mainWindow?.show()
      this.focusInput()
    })
  }

  private focusInput = () => {
    this.mainWindow?.webContents.send(FOCUS_INPUT, 'nihao');
  }
}
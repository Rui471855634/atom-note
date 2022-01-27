import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent } from "electron"

export const getWindow = (evt: IpcMainEvent | IpcMainInvokeEvent) => {
  return BrowserWindow.fromWebContents(evt.sender)
}
import { FOCUS_INPUT } from '../../../constants/ipc'

// @ts-ignore
export const ipcRenderer = window.ipcRenderer

export const focusInput = () => {
  ipcRenderer.on(FOCUS_INPUT, (event: any, arg: any) => {
    (document.querySelector('#autofocus') as HTMLInputElement)?.focus()
  });
}
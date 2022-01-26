import { FOCUS_INPUT, WIN_IS_MAXIMIZE } from '../../../constants/ipc'

// @ts-ignore
// export const ipcRenderer = window.ipcRenderer
export const ipcRenderer = window.electron.ipcRenderer
// @ts-ignore
export const platform = window.electron.platform === 'darwin' ? 'mac' : (window.electron.platform === 'win32' ? 'win' : 'linux')

export const focusInput = () => {
  ipcRenderer.on(FOCUS_INPUT, () => {
    const url = location.href
    if (url.includes('#/main')) {
      (document.querySelector('#autofocus') as HTMLInputElement)?.focus()
    } else {
      location.href = '#/main';
    }
  });
}

// 获取主窗体实例
export const isMaximize = () => {
  return ipcRenderer.invoke(WIN_IS_MAXIMIZE)
}
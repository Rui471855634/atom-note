/**
 * preload.ts 
 * 预加载，在window创建后和h5内容加载之前被调用
 */
window.addEventListener('DOMContentLoaded', () => {
  // todo
})

// window绑定ipcRenderer
// @ts-ignore
window.ipcRenderer = require('electron').ipcRenderer
/** 
 * 绑定window上下文示例
 * 虽然预加载脚本与其所附加的渲染器在全局共享着一个 window 变数，但您并不能从中直接附加任何变数到 window 之中，因为 contextIsolation 是默认的。
 * 实现h5中console.log(window.myAPI) => { desktop: true }
*/
// const { contextBridge } = require('electron')

// contextBridge.exposeInMainWorld('myAPI', {
//   desktop: true
// })

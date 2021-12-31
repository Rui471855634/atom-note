// 引入 indexedDB 的 help
import { dbCreateHelp } from 'nf-web-storage'

// 引入数据库数据
const db = {
  dbName: 'atom-note',
  ver: 1
}

/**
 * 设置
 */
export default function setup (callback: any) {
  const install = dbCreateHelp({
    dbConfig: db,
    stores: { // 数据库里的表
      taskData: {
        id: 'id',
        index: {},
        isClear: false
      },
    },
    // 加入初始数据
    init (help: any) {
      if (typeof callback === 'function') {
        callback(help)
      }
    }
  })
  return install
}

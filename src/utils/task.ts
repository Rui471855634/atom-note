import { ITaskData } from "@/libs/types/task"

export const sortTaskList = (list: ITaskData[], onlyTodo: boolean = false) => {
  // 时间顺序排序
  list.sort((a: ITaskData, b: ITaskData) => {
    return a.createTime > b.createTime ? -1 : 1
  })
  return list
}
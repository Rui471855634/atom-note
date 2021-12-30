<template lang="pug">
.main-wrap.p-5.h-full
  .todo-create-wrap.pb-5
    .input-wrap
      ElInput(autofocus v-model="todoVal" placeholder="请输入待办事项，按回车键快速添加" @keyup.enter.native="addTask")
  .todo-list-wrap.pt-5
    TodoList(:data="todoData" v-if="todoData.length > 0")
</template>

<script lang="ts">
import { ElInput } from 'element-plus'
import TodoList from '@/components/task/list.vue'
import TodoData from '@/mock/todoList'
import { useStores } from 'nf-web-storage'
import { ITaskData } from '@/libs/types/task'
import { nanoid } from 'nanoid'
import { getDateTime } from '@/utils/index'
import { sortTaskList } from '@/utils/task'
// 由于和开发IDE的vetur功能冲突，因此所有ref、reactive的引入都要ts-ignore
// @ts-ignore
import { ref, reactive } from 'vue'
import dayjs from 'dayjs'
export default {
  name: 'main',
  setup() {
    const todoVal = ref('')
    let todoData = reactive([] as ITaskData[])
    const { taskData } = useStores()
    console.log('taskData', taskData)

    // 数据查询
    const fetchList = async () => {
      let [impList, norList] = await Promise.all([taskData.list({ important: [401, true], completed: [401, false] }), taskData.list({ important: [401, false], completed: [401, false], createTime: [414, getDateTime(dayjs().subtract(1, 'day'))] })])
      let list = [...impList, ...norList]
      todoData.length = 0
      todoData.push(...sortTaskList(list))
    }

    // 数据保存
    const handleAdd = async (model: ITaskData) => {
      let res = await taskData.put(model)
      if (res) {
        fetchList()
        todoVal.value = ''
      }
    }

    const addTask = (e: any) => {
      if (!todoVal.value) return
      let msg: ITaskData = {
        id: nanoid(),
        title: todoVal.value,
        important: false,
        completed: false,
        date: getDateTime('MM-DD'),
        time: getDateTime('HH:mm'),
        createTime: getDateTime(),
      }
      handleAdd(msg)
    }

    fetchList()
    
    return {
      todoVal,
      todoData,
      addTask
    }
  },
  components: {
    ElInput,
    TodoList
  }
}
</script>

<style lang="scss" scoped>
.todo-create-wrap {
  border-bottom: 1px solid var(--el-border-color-lighter)
}
</style>
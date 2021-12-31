<template lang="pug">
.history-page.p-5.h-full
  TaskHeader(@search="searchTask" title="历史记录")
  .history-wrap.pb-5
    .input-wrap
      ElInput(id="autofocus" autofocus v-model="keyword" placeholder="请输入关键字查询" @keyup.enter.native="() => searchTask()")
  .history-list-wrap.pt-5
    TodoList(:data="todoData" :checkbox="false")
  Refresh(@click="() => searchTask()")
</template>

<script setup lang="ts">
// @ts-ignore
import { ref, reactive } from 'vue'
import { ElInput } from 'element-plus'
import TodoList from '@/components/task/list.vue'
import Refresh from '@/components/refresh.vue'
import { useStores } from 'nf-web-storage'
import { sortTaskList } from '@/utils/task'
import { ITaskData, ITaskSearchParams } from '@/libs/types/task'
// @ts-ignore
import TaskHeader from '@/components/task/task-header.vue'
let todoData = reactive([] as ITaskData[])
const keyword = ref('')
let searchParams = reactive({})

const { taskData } = useStores()

const searchTask = async (params: ITaskSearchParams = {}) => {
  searchParams = { ...searchParams, ...params }
  let list = await taskData.list({ completed: [401, true], title: [403, keyword.value], ...searchParams })
  console.log(list)
  todoData.length = 0
  todoData.push(...sortTaskList(list))
}

searchTask()
</script>
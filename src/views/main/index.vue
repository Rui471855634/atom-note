<template lang="pug">
.main-wrap.p-5.h-full
  .todo-create-wrap.pb-5
    .input-wrap
      ElInput(autofocus v-model="todoVal" placeholder="请输入待办事项")
  .todo-list-wrap.pt-5
    TodoList(:data="todoData")
</template>

<script lang="ts">
import { ElInput } from 'element-plus'
import TodoList from '@/components/task/list.vue'
import TodoData from '@/mock/todoList'
// 由于和开发IDE的vetur功能冲突，因此所有ref、reactive的引入都要ts-ignore
// @ts-ignore
import { ref, reactive } from 'vue'
export default {
  name: 'main',
  setup() {
    const todoVal = ref('')
    const todoData = reactive(TodoData.result)
    return {
      todoVal,
      todoData
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
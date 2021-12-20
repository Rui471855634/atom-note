<template lang="pug">
//- 任务列表的列表项
//-   1、完成状态checkbox
//-   2、(优先级)任务标题
//-   3、加入时间，默认只显示时间，日期是否显示待定
//-   4、操作，默认隐藏，悬停显示
.task-item.flex.flex-1.items-center.px-5.py-3(:class="{'even-row': props.even}")
  .task-item__checkbox.flex.items-center.justify-center.w-5
    ElCheckbox(v-model="task.complete")
  .task-item__title.flex.items-center.flex-1.pl-5.overflow-hidden(:class="{'is-important': task.important}")
    .task-info.block.w-full
      .task-title.truncate(v-text="task.title")
      .task-content.mt-1.truncate(v-if="task.content") {{ task.content }}
  .task-item__time.flex.items-center.justify-center.w-20
    span(v-text="task.time")
</template>

<script lang="ts">
import Vue from 'vue'
import { ElCheckbox } from 'element-plus'
export default {
  name: 'task-item',
  props: {
    item: Object,
    even: {
      default: false,
      type: Boolean
    }
  },
  setup(props: any) {
    return {
      props,
      task: props.item
    }
  },
  components: {
    ElCheckbox
  }
}
</script>

<style lang="scss" scoped>
.task-item {
  border-bottom: 1px solid var(--el-border-color-lighter);
  cursor: pointer;
  &:last-child {
    border: none;
  }
  &.even-row {
    background-color: var(--el-color-info-lighter);
  }
  &__title {
    .task-title {
      color: var(--el-text-color-primary);
    }
    .task-content {
      color: var(--el-text-color-secondary);
      font-size: 12px;
      font-weight: normal;
    }
    &.is-important {
      font-weight: bold;
      .task-title::before {
        content: '!';
        color: var(--el-color-danger);
        font-weight: bold;
        font-style: italic;
        padding-right: 4px;
      }
    }
  }
  &__time {
    color: var(--el-text-color-secondary);
    font-size: 12px;
    user-select: none;
  }
  &:hover {
    background-color: var(--el-color-info-light);
  }
}
</style>
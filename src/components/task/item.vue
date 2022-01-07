<template lang="pug">
//- 任务列表的列表项
//-   1、完成状态checkbox
//-   2、(优先级)任务标题
//-   3、加入时间，默认只显示时间，日期是否显示待定
//-   4、操作，默认隐藏，悬停显示
.task-item.flex.flex-1.items-center.px-5.py-3(:class="{'even-row': props.even, 'is-todo-done-item': props.todo && task.completed}")
  .task-item__checkbox.flex.items-center.justify-center.w-5(v-if="props.checkbox")
    ElCheckbox(v-model="task.completed" @change="handleUpdate")
  .task-item__title.flex.items-center.flex-1.pl-5.overflow-hidden(:class="{'is-important': task.important}")
    .task-info.block.w-full
      .task-title.truncate(v-text="task.title" :title="task.title")
      .task-content.mt-1.truncate(v-if="task.content" :title="task.content") {{ task.content }}
  .task-item__time.flex.items-center.justify-end.w-20
    span.mr-1(v-text="task.date" v-if="task.date !== today")
    span(v-text="task.time")
  .task-item__button.flex.items-center.justify-end
    .button-wrap.flex.items-center.hidden
      ElIcon.cursor-pointer(color="var(--el-color-danger)" @click.prevent="handleDelete" name="delete")
        Delete
</template>

<script lang="ts" setup>
// @ts-ignore
import { reactive, ref, defineEmits, defineProps } from "vue";
import { ElCheckbox, ElIcon } from "element-plus";
import { useStores } from "nf-web-storage";
import { getDateTime } from "@/utils";
import { Delete } from "@element-plus/icons-vue";
const emit = defineEmits(["refresh"]);

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  even: {
    default: false,
    type: Boolean,
  },
  todo: {
    default: false,
    type: Boolean,
  },
  checkbox: {
    default: true,
    type: Boolean,
  },
});
const itemRef = ref();
const task = reactive(props.item);
const { taskData } = useStores();
const today = getDateTime("MM-DD");
// 数据更新
const handleUpdate = async () => {
  console.log(task.completed);
  let res = await taskData.set(task);
  console.log(res);
};

const handleDelete = async () => {
  let res = await taskData.del(task)
  emit("refresh");
};
</script>

<style lang="scss" scoped>
.task-item {
  border-bottom: 1px solid var(--el-border-color-lighter);
  // cursor: pointer;
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
        content: "!";
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
  &.is-todo-done-item {
    .task-item__title {
      .task-title {
        color: var(--el-text-color-secondary);
        text-decoration: line-through;
      }
    }
  }

  &__button {
    width: 20px;
  }

  &:hover {
    .button-wrap {
      display: flex;
    }
  }
}
</style>

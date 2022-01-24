<template lang="pug">
.task-list.w-full.rounded.overflow-hidden
  Item(v-for="(item, i) in data" :key="item.id" :item="item" :even="(i + 1) % 2 === 0" :todo="todo" :checkbox="checkbox" :index="i" @refresh="handleRefresh" @detail="handleDetail")
  ElEmpty(:image-size="200" v-if="!data.length")
  TaskDetail(ref="detail" v-if="taskDetailVisible" @refresh="handleRefresh" :disabled="!todo")
</template>

<script lang="ts" setup>
// @ts-ignore
import Item from "./item.vue";
import { ElEmpty } from "element-plus";
import { defineEmits, defineProps, ref, unref, nextTick } from "vue";
import TaskDetail from '../task-detail/index.vue'
import { ITaskData } from "@/libs/types/task";
const props = defineProps({
  data: Array,
  todo: {
    default: false,
    type: Boolean,
  },
  checkbox: {
    default: true,
    type: Boolean,
  },
});

const { data, todo, checkbox } = props;
const emit = defineEmits(["refresh"]);

const detail = ref(null)
const taskDetailVisible = ref(false)
const handleDetail = async (task: ITaskData) => {
  taskDetailVisible.value = true
  await nextTick()
  // @ts-ignore
  detail.value.handleShow(task)
}

const handleRefresh = () => {
  emit("refresh");
};
</script>

<style lang="scss" scoped>
.task-list {
  border: 1px solid #e6e6e6;
}
</style>

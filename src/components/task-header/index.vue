<template lang="pug">
.task-header.pb-4.flex.items-center.justify-between
  .task-title.text-lg.font-bold.mr-6 {{ props.title }}
  ElSelect(v-model="searchRange" default-first-option placeholder="请选择查询范围" size="large" @change="handleChange")
    ElOption(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")

</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';
import { ElSelect, ElOption } from 'element-plus'
import { getDateTime } from '@/utils';
import dayjs from 'dayjs';

const searchRange = ref('')
const emit = defineEmits(['search'])

const options = [{
  value: 365 * 100, // 一百年前
  label: '全部'
}, {
  value: 1, // 一天前
  label: '最近一天'
}]

const props = defineProps({
  title: {
    type: String,
    default: '待办列表',
  },
})

const handleChange = (value: number) => {
  emit('search', { createTime: [414, getDateTime(dayjs().subtract(value, 'day'))] })
}
</script>
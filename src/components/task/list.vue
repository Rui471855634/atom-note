<template lang="pug">
.task-list.w-full.rounded.overflow-hidden
  Item(v-for="(item, i) in data" :key="item.id" :item="item" :even="(i + 1) % 2 === 0" :todo="todo" :checkbox="checkbox" :index="i" @refresh="handleRefresh")
  ElEmpty(:image-size="200" v-if="!data.length")
</template>

<script lang="ts">
// @ts-ignore
import Item from './item.vue'
import { ElEmpty } from 'element-plus'
import { defineEmits } from 'vue'
export default {
  name: 'task-list',
  props: {
    data: Array,
    todo: {
      default: false,
      type: Boolean
    },
    checkbox: {
      default: true,
      type: Boolean
    }
  },
  setup(props: any) {
    const { data, todo, checkbox } = props
    const emit = defineEmits(['refresh'])

    const handleRefresh = () => {
      emit('refresh')
    }
    return {
      data,
      todo,
      checkbox,
      handleRefresh
    }
  },
  components: {
    Item,
    ElEmpty
  }
}
</script>

<style lang="scss" scoped>
.task-list {
  border: 1px solid #e6e6e6;
}
</style>
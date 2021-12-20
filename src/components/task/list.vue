<template lang="pug">
.task-list.w-full.rounded.overflow-hidden
  Item(v-for="(item, i) in data" :key="item.id" :item="item" :even="(i + 1) % 2 === 0")
</template>

<script lang="ts">
// @ts-ignore
import Vue, { reactive } from 'vue'
import Item from './item.vue'
export default {
  name: 'task-list',
  props: {
    data: Array
  },
  setup(props: any) {
    return {
      data: props.data
    }
  },
  components: {
    Item
  }
}
</script>

<style lang="scss" scoped>
.task-list {
  border: 1px solid #e6e6e6;
}
</style>
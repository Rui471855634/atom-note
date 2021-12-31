<template lang="pug">
.atom-note.flex.w-full
  Aside
  .main.flex-1.pb-8
    router-view
</template>

<script lang="ts">
import Aside from '@/components/aside.vue'
export default {
  name: 'App',
  setup() {
  },
  components: {
    Aside,
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: var(--el-bg-color);
  width: calc(100vw - 56px)
}
</style>
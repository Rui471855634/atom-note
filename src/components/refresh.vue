<template lang="pug">
.refresh-wrap.fixed.bottom-6.right-8.w-8.h-8.z-9999.flex.items-center.justify-center.cursor-pointer.rounded-2xl(@click="handleRefresh")
  ElIcon
    RefreshRight(color="#fff")
</template>

<script lang="ts">
// node_modules/@element-plus/icons-vue/dist/lib/refresh-right.vue.js
import { RefreshRight } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
export default {
  // emits: ['click'],
  setup(props: any) {
    const handleRefresh = () => {
      console.log('refresh', props)
      // props.$emit('click')
    }
    return {
      handleRefresh
    }
  },
  components: {
    ElIcon,
    RefreshRight
  }
}
</script>
<style lang="scss" scoped>
.refresh-wrap {
  background: var(--el-color-primary-light-1)
}
</style>
<template lang="pug">
ElDialog(v-model="needUpdate" width="400px" title="有新版本啦！")
  span.flex.items-center 您可以放心点击该
    ElLink(type="primary" href="https://github.com/AlanOzil/atom-note/releases/latest") 链接
    | ，下载符合您系统的最新版本
  
</template>

<script lang="ts" setup>
import { ElDialog, ElLink } from 'element-plus';
import { ref, onMounted, defineProps } from 'vue';
import { hasNewVersion } from '@/utils'
const props = defineProps({
  version: {
    default: '',
    type: String,
  },
})
const needUpdate = ref(false)
onMounted(async () => {
  if (process.env.NODE_ENV === 'development') return;
  const hasNew = await hasNewVersion(props.version);
  if (hasNew) {
    needUpdate.value = true;
  }
})
</script>

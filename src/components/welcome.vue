<template lang="pug">
ElDialog(v-model="dialogVisible" width="400px" title="欢迎使用Atom Note" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false")
  span 此后您可以使用
    ElTag.mx-1 {{keyName}} + Shift + E
    | 快速呼起待办面板，直接开始记录您的待办。
  template(#footer)
    span.dialog-footer
      ElButton(type="primary" @click="dialogVisible = false" :disabled="confirmDisabled") {{confirmDisabled ? `知道了(${confirmTime}s)` : '知道了'}}
</template>

<script lang="ts" setup>
import { ElDialog, ElButton, ElTag } from 'element-plus';
import { ref } from 'vue';
import { isNewUser, ctrlName } from '@/utils'

const dialogVisible = ref(isNewUser())
const confirmDisabled = ref(true)
const confirmTime = ref(5)
if (dialogVisible.value) {
  const interval = setInterval(() => {
    confirmTime.value = confirmTime.value - 1
    if (confirmTime.value === 0) {
      clearInterval(interval)
      confirmDisabled.value = false
    }
  }, 1000)
}
const keyName = ctrlName
</script>

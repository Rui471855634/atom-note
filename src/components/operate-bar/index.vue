<template lang="pug">
.operate-bar.h-6.w-full.flex.justify-end(@dblclick="handleMaximize")
  WinTool(v-if="platform !== 'mac'" :isMaximized="isMaximized" @max="val => isMaximized = val")
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import WinTool from './win-tool.vue'
import { platform, ipcRenderer, isMaximize as isMax } from '@/libs/ipc'
import { WIN_MAXIMIZE, WIN_UNMAXIMIZE } from '../../../constants/ipc'
const isMaximized = ref(false)

onMounted(() => {
  calcMaximize()

  window.onresize = () => {
    calcMaximize()
  }
})

const calcMaximize = () => {
    isMax().then((isMax: boolean) => {
      isMaximized.value = isMax
    })
}

const handleMaximize = () => {
  isMax().then((isMax: boolean) => {
    console.log(isMax)
    if (isMax) {
      ipcRenderer.send(WIN_UNMAXIMIZE)
    } else {
      ipcRenderer.send(WIN_MAXIMIZE)
    }
    isMaximized.value = !isMax
  })
}

</script>

<style lang="scss" scoped>
.operate-bar {
  -webkit-app-region: drag;
}
</style>

<template lang="pug">
.win-tool.flex.items-center
  a.menubar-minimize(@click="handleMinimize")
    svg-icon(name="system_shrink")
  a.menubar-maximize(@click="handleMaximize")
    svg-icon(:name="props.isMaximized ? 'system_cancel_zoom' : 'system_zoom'")
  a.menubar-close(@click="handleClose")
    svg-icon(name="system_close")
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { ipcRenderer, isMaximize as isMax } from '@/libs/ipc'
import { WIN_MAXIMIZE, WIN_UNMAXIMIZE, WIN_MINIMIZE, WIN_CLOSE } from '../../../constants/ipc'

const emit = defineEmits(['max'])

const props = defineProps({
  isMaximized: {
    type: Boolean,
    default: false,
  },
})

const handleMinimize = () => {
  ipcRenderer.send(WIN_MINIMIZE)
}

const handleMaximize = () => {
  if (props.isMaximized) {
      ipcRenderer.send(WIN_UNMAXIMIZE)
    } else {
      ipcRenderer.send(WIN_MAXIMIZE)
    }
    emit('max', !props.isMaximized)
}

const handleClose = () => {
  ipcRenderer.send(WIN_CLOSE)
}

</script>

<style lang="scss" scoped>
.win-tool {
  float: right;
  display: flex;
  flex-direction: row;
  justify-items: center;
  pointer-events: auto;
  z-index: 100;

  a {
    width: 40px;
    height: 25px;
    text-align: center;
    color: #7e8186;
    display: flex;
    justify-content: center;
    align-items: center;

    &:not(.minimize):hover {
      background-color: rgba(149, 155, 164, 0.18);
      cursor: default;
    }

    &.minimize {
      &.hover {
        background-color: rgba(149, 155, 164, 0.18);
        cursor: default;
      }
    }
  }
}
</style>
<template lang="pug">
.atom-note.flex.w-full
  Aside
  .main.flex-1
    router-view 
</template>

<script lang="ts">
import { ElLoading } from 'element-plus'
import { useStore } from 'vuex';
import { computed } from 'vue';
import Aside from '@/components/aside.vue'
export default {
  name: 'App',
  setup() {
    const store = useStore();
    const loading = computed(() => store.state.loading);
    console.log(store, loading.value)
    return {
      loading
    }
  },
  components: {
    ElLoading,
    Aside
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: var(--el-bg-color-base);
}
</style>
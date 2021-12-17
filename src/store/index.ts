import { createStore } from 'vuex'
import { ElLoading, ILoadingInstance } from 'element-plus'

export interface baseState {
  loading: ILoadingInstance | null
}

export default createStore({
  state () {
    return {
      // 并非bool类型，存储的是ElLoading实例
      loading: null
    }
  },
  mutations: {
    setLoading (state: baseState, loading: boolean) {
      if (loading && !state.loading) {
        state.loading = ElLoading.service({ fullscreen: true })
      }
      if (!loading) {
        state.loading?.close()
        state.loading = null
      }
    }
  }
})
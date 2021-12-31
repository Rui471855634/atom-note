import * as VueRouter from 'vue-router'
console.log('VueRouter', VueRouter)
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { 
    path: '/', 
    component: () => import('@/App.vue'),
    redirect: '/main',
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/index.vue')
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('@/views/history/index.vue')
  }
  // { path: '/about', component: About },
]

// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/Layout.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: '首页',
          component: () => import('@/views/Home.vue')
        },
        {
          path: '/oddsModel',
          name: '概率模型',
          component: () => import('@/views/OddsModel.vue')
        },
        {
          path: '/oddsDistribution',
          name: '概率分布',
          component: () => import('@/views/OddsDistribution.vue')
        },
        {
          path: '/calculate',
          name: '概率计算',
          component: () => import('@/views/Calculate.vue')
        }
      ]
    }
  ]
})

export default router

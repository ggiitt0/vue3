import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout' //布局页

const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component:  () => import('@/views/login'),
    hidden:true
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/error'),
    hidden:true
  },
  {
    path: '',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/index'),
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
]

const router = createRouter({
  mode: 'history', // 去掉url中的#
  history: createWebHashHistory(),
  routes:constantRoutes,
	scrollBehavior: () => ({  top: 0 })
})

export default router

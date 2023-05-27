import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Code from '../views/Code.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/code',
    name: 'Code',
    component: Code
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

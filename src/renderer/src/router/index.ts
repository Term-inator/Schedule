import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Code from '../views/Code.vue'
import Settings from '../views/Settings.vue'
import Help from '../views/Help.vue'

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
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/help',
    name: 'Help',
    component: Help
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

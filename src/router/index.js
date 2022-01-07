import Vue from 'vue'
import VueRouter from 'vue-router'

const calendar_page = () => import('@/views/calendarPage/calendarPage')
const add_schedule_page = () => import('@/views/addSchedulePage/addSchedulePage')
const schedule_page = () => import('@/views/schedulePage/schedulePage')

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: '/calendar'
    },
    {
        name: 'calendar',
        path: '/calendar',
        component: calendar_page
    },
    {
        name: 'add_schedule',
        path: '/add_schedule',
        component: add_schedule_page
    },
    {
        name: 'schedule',
        path: '/schedule',
        component: schedule_page
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router
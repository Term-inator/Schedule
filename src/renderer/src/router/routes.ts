import { RouteRecordRaw } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue'
import HomePage from '../pages/HomePage.vue'
import DatabasePage from '../pages/DatabasePage.vue'
import SchedulePage from '../pages/SchedulePage.vue'
import SettingsPage from '../pages/SettingsPage.vue'
import HelpPage from '../pages/HelpPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { name: 'home', path: 'home', component: HomePage },
      { name: 'schedule', path: 'schedule/:id', component: SchedulePage },
      { name: 'database', path: 'database', component: DatabasePage },
      { name: 'settings', path: 'settings', component: SettingsPage },
      { name: 'help', path: 'help', component: HelpPage },
    ],
    redirect: '/home',
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue'),
  },
];

export default routes;

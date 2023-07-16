import { RouteRecordRaw } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue'
import HomePage from '../pages/HomePage.vue'
import CodePage from '../pages/CodePage.vue'
import SchedulePage from '../pages/SchedulePage.vue'
import SettingsPage from '../pages/SettingsPage.vue'
import HelpPage from '../pages/HelpPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: 'home', component: HomePage },
      { name: 'schedule', path: 'schedule/:id', component: SchedulePage },
      { path: 'code', component: CodePage },
      { path: 'settings', component: SettingsPage },
      { path: 'help', component: HelpPage },
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

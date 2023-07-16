<template>
  <n-layout position="absolute">
    <n-layout-header bordered :inverted="true" style="padding: 0.5vh 0 0.5vh 0;">
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" :inverted="true"/>
    </n-layout-header>
    <n-layout position="absolute" :native-scrollbar="false" content-style="padding: 3vh 0 3vh 0;" style="top: 5vh; bottom: 5vh; height: 90vh;">
      <router-view></router-view>
    </n-layout>
    <n-layout-footer position="absolute" bordered :inverted="true" style="height: 5vh;">
      <div style="text-align: center">© 2023</div>
    </n-layout-footer>
  </n-layout>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { NLayout, NLayoutHeader, NLayoutFooter, NMenu, MenuOption } from 'naive-ui'
import {
  HomeOutline as HomeIcon,
  CodeSlashOutline as CodeIcon,
  SettingsOutline as SettingsIcon,
  HelpCircleOutline as HelpIcon
} from '@vicons/ionicons5'
import { renderIcon } from '@renderer/utils/utils'

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/home',
          class: 'menu-item'
        },
        'Home'
      ),
    key: 'home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/settings',
          class: 'menu-item'
        },
        'Settings'
      ),
    key: 'settings',
    icon: renderIcon(SettingsIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/help',
          class: 'menu-item'
        },
        'Help'
      ),
    key: 'help',
    icon: renderIcon(HelpIcon)
  }
]

const activeKey = ref('home')
</script>

<style lang="less" scoped>
:deep(.menu-item) {
  font-size: large;
}
</style>

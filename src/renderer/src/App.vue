<template>
  <n-layout>
    <n-layout-header bordered position="absolute" :inverted="true" style="padding: 10px 0 10px 0;">
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" :inverted="true"/>
    </n-layout-header>
    <n-layout style="margin: 5vh 0 0 0; height: 95vh;">
      <router-view></router-view>
    </n-layout>
    <n-layout-footer bordered position="absolute" :inverted="true" style="height: 5vh;">
      <div style="text-align: center">© 2023</div>
    </n-layout-footer>
  </n-layout>
</template>

<script setup lang="ts">
import { h, Component, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { NLayout, NLayoutHeader, NLayoutFooter, NMenu, MenuOption, NIcon } from 'naive-ui'
import {
  HomeOutline as HomeIcon,
  CodeSlashOutline as CodeIcon,
  SettingsOutline as SettingsIcon,
  HelpCircleOutline as HelpIcon
} from '@vicons/ionicons5'

function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

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
          to: '/code',
          class: 'menu-item'
        },
        'Code'
      ),
    key: 'code',
    icon: renderIcon(CodeIcon)
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

<template>
  <n-layout position="absolute">
    <n-layout-header bordered :inverted="true" style="padding: 0.5vh 0 0.5vh 0;">
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" :inverted="true"/>
    </n-layout-header>
    <n-layout position="absolute" :native-scrollbar="false" content-style="height: 100%;" style="top: 52.96px; bottom: 5vh;">
      <router-view></router-view>
    </n-layout>
    <n-layout-footer position="absolute" bordered :inverted="true" style="height: 5vh;">
      <div style="text-align: center">© 2023</div>
    </n-layout-footer>
  </n-layout>
  <idea-pane></idea-pane>
</template>

<script setup lang="ts">
import { h, ref, onBeforeUnmount } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { 
  NLayout, NLayoutHeader, NLayoutFooter, 
  NMenu, MenuOption, NIcon
} from 'naive-ui'
import {
  HomeOutline as HomeIcon,
  SettingsOutline as SettingsIcon,
  HelpCircleOutline as HelpIcon
} from '@vicons/ionicons5'
import {
  Database as DatabaseIcon
} from '@vicons/tabler'
import IdeaPane from './IdeaPane.vue'

const router = useRouter()

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
    icon: () => h(NIcon, null, { default: () => h(HomeIcon) })
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/database',
          class: 'menu-item'
        },
        'Database'
      ),
    key: 'database',
    icon: () => h(NIcon, null, { default: () => h(DatabaseIcon) })
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
    icon: () => h(NIcon, null, { default: () => h(SettingsIcon) })
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
    icon: () => h(NIcon, null, { default: () => h(HelpIcon) })
  }
]

const activeKey = ref('home')

// 键盘事件
const handleKeyboardEvent = (e: KeyboardEvent) => {
  // ctrl + right 向右切换
  if (e.ctrlKey && e.key === 'ArrowRight') {
    const index = menuOptions.findIndex((option) => option.key === activeKey.value)
    if (index !== -1) {
      const nextIndex = (index + 1) % menuOptions.length
      activeKey.value = menuOptions[nextIndex].key as string
      router.push({ name: activeKey.value })
    }
  }
  // ctrl + left 向左切换
  else if (e.ctrlKey && e.key === 'ArrowLeft') {
    const index = menuOptions.findIndex((option) => option.key === activeKey.value)
    if (index !== -1) {
      const nextIndex = (index - 1 + menuOptions.length) % menuOptions.length
      activeKey.value = menuOptions[nextIndex].key as string
      router.push({ name: activeKey.value })
    }
  }
}

window.addEventListener('keydown', handleKeyboardEvent)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyboardEvent)
})
</script>

<style lang="less" scoped>
:deep(.menu-item) {
  font-size: large;
}
</style>

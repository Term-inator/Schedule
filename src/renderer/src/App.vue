<template>
  <div>
    <div>
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { h, Component, ref } from 'vue'
import { NIcon } from 'naive-ui'
import { NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import {
  HomeOutline as HomeIcon,
  CodeSlashOutline as CodeIcon
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
          to: '/home'
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
        },
        'Code'
      ),
    key: 'code',
    icon: renderIcon(CodeIcon)
  }
]

const activeKey = ref('home')
</script>

<template>
  <n-layout position="absolute">
    <n-layout-header bordered :inverted="true" style="padding: 0.5vh 0 0.5vh 0;">
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" :inverted="true"/>
      <div class="avatar">
        <n-dropdown :options="userOptions" @select="handleSelect">
          <div v-if="userStore.isLogin">
            <n-avatar round size="small" :style="{cursor: 'pointer'}" :src="userStore.user.profileImageUrl" />
          </div>
          <div v-else>
            <n-avatar round size="small" :style="{cursor: 'pointer'}">
              <n-icon size="large">
                <user-icon />
              </n-icon>
            </n-avatar>
          </div>
        </n-dropdown>
      </div>
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
import { h, ref, onBeforeUnmount, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { 
  NLayout, NLayoutHeader, NLayoutFooter, 
  NMenu, MenuOption, NIcon, NAvatar, NDropdown, NText, useNotification
} from 'naive-ui'
import {
  HomeOutline as HomeIcon,
  SettingsOutline as SettingsIcon,
  HelpCircleOutline as HelpIcon,
} from '@vicons/ionicons5'
import { UserOutlined as UserIcon } from '@vicons/antd'
import {
  Database as DatabaseIcon
} from '@vicons/tabler'
import IdeaPane from './IdeaPane.vue'
import { apiHandler } from '@renderer/apis/scheduleController'
import { v4 as uuidv4 } from 'uuid'
import { setToken } from '@renderer/utils/auth'
import { useUserStore, useEventBusStore, Event } from '@renderer/store'

const router = useRouter()
const userStore = useUserStore()
const eventBusStore = useEventBusStore()
const notification = useNotification()

eventBusStore.subscribe(Event.LoginExpired, () => {
  notification.info({
    title: 'Info',
    content: 'Login is expired.',
  })
})

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

const userOptions = computed(() => {
  const options: MenuOption[] = [
    {
      key: 'header',
      type: 'render',
      render: () => {
        return h(
          'div',
          { style: 'display: flex; align-items: center; padding: 8px 12px;' },
          [
            userStore.isLogin ?
            h(NAvatar, {
              round: true,
              style: 'margin-right: 12px;',
              src: userStore.user.profileImageUrl
            }) : 
            h(NAvatar, {
              round: true,
              style: 'margin-right: 12px;',
              size: 'large'
            }, { default: () => h(UserIcon) }),
            h('div', null, [
              h('div', null, [h(NText, { depth: 2 }, { default: () => userStore.isLogin ? `${userStore.user.firstName} ${userStore.user.lastName}` : 'Guest' })]),
              h('div', { style: 'font-size: 12px;' }, [
                h(
                  NText,
                  { depth: 3 },
                  { default: () => userStore.user.email }
                )
              ])
            ])
          ]
        )
      }
    }
  ]
  if (userStore.isLogin) {
    options.push({
      label: 'Log out',
      key: 'logout'
    })
  } else {
    options.push({
      label: 'Login',
      key: 'login'
    })
  }
  return options
})

const handleSelect = async (key: string | number) => {
  console.log(key)
  const uid = sessionStorage.getItem('uid') || uuidv4()
  // 存储 uid
  sessionStorage.setItem('uid', uid)
  if (key === 'login') {
    await apiHandler({
      group: 'user',
      name: 'login',
      params: { uid },
    })
    // @ts-ignore
    window.api.loginReply(async (data) => {
      console.log(data)
      await setToken(data.token)
      await userStore.login(data.id)
    })
  } else if (key === 'logout') {
    await userStore.logout()
  }
}

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

.avatar {
  float: right;
  padding: 0.6rem 1.2rem 0 0;
}
</style>

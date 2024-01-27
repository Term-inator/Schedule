import { defineStore } from 'pinia'
import { apiHandler, sync, download } from '@renderer/apis/scheduleController'
import { removeToken, setToken, setUserId } from '@renderer/utils/auth'
import { useEventBusStore, Event } from './eventBusStore'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'


export const useUserStore = defineStore('user', {
  state: (): {
    user: {
      email: string,
      firstName: string,
      lastName: string,
      profileImageUrl: string,
      locale: string,
      isStaff: boolean,
      isSuperuser: boolean,
    },
    isLogin: boolean,
  } => ({
    user: {
      email: '',
      firstName: '',
      lastName: '',
      profileImageUrl: '',
      locale: '',
      isStaff: false,
      isSuperuser: false,
    },
    isLogin: false,
  }),
  actions: {
    async init() {
      if (!localStorage.getItem('lastSyncAt')) {
        localStorage.setItem('lastSyncAt', '1970-01-01T00:00:00.000Z')
      }
    },
    async login(type: 'active' | 'passive' = 'active') {
      let uid = sessionStorage.getItem('uid')
      if (uid === null) {
        uid = uuidv4()
        sessionStorage.setItem('uid', uid!)  // 上一行进行了赋值
      }
      await apiHandler({
        name: 'openWebSocket',
        params: { uid },
      })
      // @ts-ignore
      window.api.connectReply(async (data) => {
        if (type === 'active') {
          await apiHandler({
            name: 'login',
            params: { uid },
          })
        }
        else {
          this.afterLogin()
        }
      })
      // @ts-ignore
      window.api.loginReply(async (data) => {
        await setToken(data.token)
        await setUserId(data.userId)
        await this.afterLogin()
      })
    },
    async afterLogin() {
      this.isLogin = true
      const profile = await apiHandler({
        group: 'user',
        name: 'getProfile',
        params: {},
      })
      this.setUser(profile)
      await this.sync()
    },
    async logout(type: 'active' | 'passive' = 'active') {
      if (type === 'active') {
        const lastSyncAt = localStorage.getItem('lastSyncAt')
        if (lastSyncAt === null) {
          throw new Error('lastSyncAt is null') // 如果是 null，那么就是代码写错了
        }
        await download(lastSyncAt)
        localStorage.setItem('lastSyncAt', DateTime.now().setZone('UTC').toISO()!) // 一定合法，所以不会是 null
        await apiHandler({
          group: 'user',
          name: 'logout',
          params: {},
        })
      } else {
        // 被动退出，不下载服务器数据
        useEventBusStore().publish(Event.LoginExpired)
      }
      await apiHandler({
        name: 'closeWebSocket',
        params: { },
      })
      this.$reset()
      removeToken()
      useEventBusStore().publish(Event.DataUpdated)
    },
    setUser(user: {
      email: string,
      first_name: string,
      last_name: string,
      profile_image_url: string,
      locale: string,
      is_staff: boolean,
      is_superuser: boolean,
    }) {
      this.user.email = user.email
      this.user.firstName = user.first_name
      this.user.lastName = user.last_name
      this.user.profileImageUrl = user.profile_image_url
      this.user.locale = user.locale
      this.user.isStaff = user.is_staff
      this.user.isSuperuser = user.is_superuser
    },
    async sync() {
      const eventBusStore = useEventBusStore()
      if (!this.isLogin) {
        eventBusStore.publish(Event.LoginExpired)
        return
      }
      const lastSyncAt = localStorage.getItem('lastSyncAt')
      if (lastSyncAt === null) {
        throw new Error('lastSyncAt is null') // 如果是 null，那么就是代码写错了
      }
      eventBusStore.publish(Event.Syncing, true)
      await sync(lastSyncAt)
      localStorage.setItem('lastSyncAt', DateTime.now().setZone('UTC').toISO()!) // 一定合法，所以不会是 null
      eventBusStore.publish(Event.DataUpdated)
      eventBusStore.publish(Event.Syncing, false)
      console.log('synced')
    }
  }
})
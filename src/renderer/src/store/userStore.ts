import { defineStore } from 'pinia'
import { apiHandler } from '@renderer/apis/scheduleController'


export const useUserStore = defineStore('user', {
  state: (): {
    user: {
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      profileImageUrl: string,
      locale: string,
    },
    isLogin: boolean,
  } => ({
    user: {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      profileImageUrl: '',
      locale: '',
    },
    isLogin: false,
  }),
  actions: {
    async login(uid: string) {
      // const profile = await apiHandler({
      //   group: 'user',
      //   name: 'getProfile',
      //   params: { uid },
      // })
      // console.log(profile)
      this.isLogin = true
    },
    async logout() {
      await apiHandler({
        group: 'user',
        name: 'logout',
        params: {},
      })
      this.$reset()
    },
    setUser(user: {
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      profileImageUrl: string,
      locale: string,
    }) {
      this.user = user
    }
  }
})
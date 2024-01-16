import { defineStore } from 'pinia'
import { apiHandler } from '@renderer/apis/scheduleController'
import { removeToken } from '@renderer/utils/auth'


export const useUserStore = defineStore('user', {
  state: (): {
    user: {
      id: string,
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
      id: '',
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
    async login(id: string | null = null) {
      if (!id) {
        id = localStorage.getItem('userId')
      }
      this.isLogin = true
      const profile = await apiHandler({
        group: 'user',
        name: 'getProfileById',
        params: { id },
      })
      this.setUser(profile)
    },
    async logout() {
      await apiHandler({
        group: 'user',
        name: 'logout',
        params: {},
      })
      this.$reset()
      removeToken()
    },
    setUser(user: {
      id: string,
      email: string,
      first_name: string,
      last_name: string,
      profile_image_url: string,
      locale: string,
      is_staff: boolean,
      is_superuser: boolean,
    }) {
      this.user.id = user.id
      this.user.email = user.email
      this.user.firstName = user.first_name
      this.user.lastName = user.last_name
      this.user.profileImageUrl = user.profile_image_url
      this.user.locale = user.locale
      this.user.isStaff = user.is_staff
      this.user.isSuperuser = user.is_superuser
      localStorage.setItem('userId', user.id)
    }
  }
})
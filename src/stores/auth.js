import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    async login(credentials) {
      const { data } = await axios.post(
        'http://127.0.0.1:8000/api/login',
        credentials
      )

      this.token = data.token
      this.user = data.user

      localStorage.setItem('token', data.token)
    },

    async logout() {
      await axios.post(
        'http://127.0.0.1:8000/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
      )

      this.token = null
      this.user = null

      localStorage.removeItem('token')
    }
  }
})
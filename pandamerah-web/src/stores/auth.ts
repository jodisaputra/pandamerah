import { defineStore } from 'pinia'
import api from '../config/api'
import { jwtDecode } from 'jwt-decode'

interface User {
  id: number
  name: string
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | Record<string, string[]> | null
}

function getUserFromToken(token: string | null): User | null {
  if (!token) return null
  try {
    const decoded: any = jwtDecode(token)
    return {
      id: decoded.id,
      name: decoded.name || decoded.email || 'User',
      email: decoded.email,
    }
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: getUserFromToken(localStorage.getItem('token')),
    token: localStorage.getItem('token'),
    loading: false,
    error: null
  }),

  actions: {
    async login(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const response = await api.post('/auth/login', {
          email,
          password
        })
        this.user = response.data.user
        this.token = response.data.token
        localStorage.setItem('token', response.data.token)
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        return true
      } catch (error: any) {
        if (error.response?.data?.errors) {
          this.error = error.response.data.errors
        } else {
          this.error = error.response?.data?.message || 'An error occurred'
        }
        return false
      } finally {
        this.loading = false
      }
    },

    async register(name: string, email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const response = await api.post('/auth', {
          name,
          email,
          password
        })
        this.user = response.data.user
        this.token = response.data.token
        localStorage.setItem('token', response.data.token)
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        return true
      } catch (error: any) {
        this.error = error.response?.data?.message || 'An error occurred'
        return false
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    }
  }
}) 
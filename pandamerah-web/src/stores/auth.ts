import { defineStore } from 'pinia'
import axios from 'axios'
import type { AuthState, LoginCredentials, RegisterData, AuthResponse } from '../types/auth'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token')
  }),

  actions: {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
      try {
        const response = await axios.post<AuthResponse>('http://localhost:3000/api/auth/login', credentials)
        this.token = response.data.token
        this.user = response.data.user
        this.isAuthenticated = true
        localStorage.setItem('token', response.data.token)
        return response.data
      } catch (error) {
        throw error
      }
    },

    async register(userData: RegisterData): Promise<void> {
      try {
        await axios.post('http://localhost:3000/api/auth/register', userData)
      } catch (error) {
        throw error
      }
    },

    logout(): void {
      this.token = null
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    }
  }
}) 
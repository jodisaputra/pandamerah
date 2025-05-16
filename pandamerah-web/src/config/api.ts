import axios from 'axios';
import router from '../router';
import { useAuthStore } from '../stores/auth';

export const API_CONFIG = {
  baseURL: 'http://localhost:3000/api'
};

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  withCredentials: true // allow cookies for refresh token
});

// Add request interceptor to add token to all requests
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: any[] = [];

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      router.currentRoute.value.path !== '/login'
    ) {
      originalRequest._retry = true;
      if (typeof window !== 'undefined' && (window as any).openSessionModal) {
        (window as any).openSessionModal();
      }
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
        (window as any).handleSessionModalAction = async (action: 'extend' | 'logout') => {
          if (action === 'extend') {
            try {
              const refreshResponse = await api.post('/auth/refresh');
              const newToken = refreshResponse.data.token;
              const authStore = useAuthStore();
              authStore.token = newToken;
              localStorage.setItem('token', newToken);
              api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
              processQueue(null, newToken);
              resolve(api(originalRequest));
            } catch (refreshError) {
              const authStore = useAuthStore();
              authStore.logout();
              localStorage.removeItem('token');
              processQueue(refreshError, null);
              reject(refreshError);
            }
          } else {
            const authStore = useAuthStore();
            authStore.logout();
            router.push('/login');
            processQueue('logout', null);
            reject(error);
          }
        };
      });
    }
    return Promise.reject(error);
  }
);

export default api; 
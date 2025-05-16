import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // If logged in and trying to access login or register, redirect to dashboard
  if (token && (to.path === '/login' || to.path === '/register')) {
    next('/dashboard')
    return
  }
  // If not logged in and trying to access a protected route
  if (to.meta.requiresAuth && !token) {
    if (to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
    return
  }
  next()
})

export default router 
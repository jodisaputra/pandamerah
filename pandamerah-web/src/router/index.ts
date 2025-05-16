import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/Login.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import NotFound from '../views/not-found/NotFound.vue'
import MenuCategory from '../views/menu-category/MenuCategory.vue'
import MenuCategoryCreate from '../views/menu-category/MenuCategoryCreate.vue'
import MenuCategoryEdit from '../views/menu-category/MenuCategoryEdit.vue'

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
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/menu-categories',
      name: 'menu-categories',
      component: MenuCategory,
      meta: {
        requiresAuth: true,
        title: 'Menu Categories'
      }
    },
    {
      path: '/menu-categories/create',
      name: 'menu-category-create',
      component: MenuCategoryCreate,
      meta: { requiresAuth: true, title: 'Create Menu Category' }
    },
    {
      path: '/menu-categories/:id/edit',
      name: 'menu-category-edit',
      component: MenuCategoryEdit,
      meta: { requiresAuth: true, title: 'Edit Menu Category' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // If logged in and trying to access login, redirect to dashboard
  if (token && to.path === '/login') {
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
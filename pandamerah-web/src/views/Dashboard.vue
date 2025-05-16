<template>
  <div id="wrapper">
    <Sidebar :onToggleSidebar="toggleSidebar" :sidebarToggled="sidebarToggled" />
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <Navbar @logout="handleLogout" :onToggleSidebar="toggleSidebar" :sidebarToggled="sidebarToggled" :userName="authStore.user?.name || ''" />
        <div class="container-fluid">
          <!-- Page Heading -->
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
          </div>
          <!-- Content Row -->
          <div class="row">
            <!-- Welcome Card -->
            <div class="col-xl-12 col-md-12 mb-4">
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Welcome
                      </div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                        {{ authStore.user?.name }}
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-user fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
  <a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
  </a>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const sidebarToggled = ref(false)
const toggleSidebar = () => {
  sidebarToggled.value = !sidebarToggled.value
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script> 
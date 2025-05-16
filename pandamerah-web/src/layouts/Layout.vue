<template>
  <div id="wrapper">
    <Sidebar :onToggleSidebar="toggleSidebar" :sidebarToggled="sidebarToggled" />
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <Navbar :onToggleSidebar="toggleSidebar" :sidebarToggled="sidebarToggled" :userName="userName" />
        <div class="container-fluid">
          <slot />
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { useAuthStore } from '../stores/auth'

const sidebarToggled = ref(false)
const toggleSidebar = () => {
  sidebarToggled.value = !sidebarToggled.value
}

const authStore = useAuthStore()
const userName = authStore.user?.name || 'User'
</script> 
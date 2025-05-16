<template>
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
    :class="{ toggled: sidebarToggled }"
  >
    <!-- Sidebar - Brand -->
    <router-link class="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-laugh-wink"></i>
      </div>
      <div class="sidebar-brand-text mx-3">Pandamerah</div>
    </router-link>
    <hr class="sidebar-divider my-0" />
    <li class="nav-item" :class="{ active: route.path === '/dashboard' }">
      <router-link class="nav-link" to="/dashboard">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span></router-link>
    </li>
    <hr class="sidebar-divider" />
    <div class="sidebar-heading">Interface</div>
    <li class="nav-item">
      <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
        aria-expanded="true" aria-controls="collapseTwo">
        <i class="fas fa-fw fa-cog"></i>
        <span>Components</span>
      </a>
      <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Custom Components:</h6>
          <router-link class="collapse-item" to="#">Buttons</router-link>
          <router-link class="collapse-item" to="#">Cards</router-link>
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
        aria-expanded="true" aria-controls="collapseUtilities">
        <i class="fas fa-fw fa-wrench"></i>
        <span>Utilities</span>
      </a>
      <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
        data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Custom Utilities:</h6>
          <router-link class="collapse-item" to="#">Colors</router-link>
          <router-link class="collapse-item" to="#">Borders</router-link>
          <router-link class="collapse-item" to="#">Animations</router-link>
          <router-link class="collapse-item" to="#">Other</router-link>
        </div>
      </div>
    </li>
    <hr class="sidebar-divider" />
    <div class="sidebar-heading">Addons</div>
    <li class="nav-item">
      <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
        aria-expanded="true" aria-controls="collapsePages">
        <i class="fas fa-fw fa-folder"></i>
        <span>Pages</span>
      </a>
      <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Login Screens:</h6>
          <router-link class="collapse-item" to="/login">Login</router-link>
          <div class="collapse-divider"></div>
          <h6 class="collapse-header">Other Pages:</h6>
          <router-link class="collapse-item" to="/404">404 Page</router-link>
        </div>
      </div>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="#">
        <i class="fas fa-fw fa-chart-area"></i>
        <span>Charts</span>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="#">
        <i class="fas fa-fw fa-table"></i>
        <span>Tables</span>
      </router-link>
    </li>
    <hr class="sidebar-divider d-none d-md-block" />
    <div class="text-center d-none d-md-inline">
      <button class="rounded-circle border-0" id="sidebarToggle" @click="onToggleSidebar"></button>
    </div>
  </ul>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const props = defineProps<{ onToggleSidebar: () => void, sidebarToggled: boolean }>()
const route = useRoute()
</script>

<style scoped>
#sidebarToggle {
  z-index: 1050;
  position: relative;
  background: #ffffff88;
  pointer-events: auto;
}
</style> 
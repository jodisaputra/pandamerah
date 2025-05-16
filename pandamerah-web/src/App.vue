<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SessionExtendModal from './components/SessionExtendModal.vue';
import { useAuthStore } from './stores/auth';
import { useRouter } from 'vue-router';
import api from './config/api';

const showSessionModal = ref(false);
const authStore = useAuthStore();
const router = useRouter();

function openSessionModal() {
  showSessionModal.value = true;
}

function onExtend() {
  showSessionModal.value = false;
  if (typeof window !== 'undefined' && (window as any).handleSessionModalAction) {
    (window as any).handleSessionModalAction('extend');
    window.location.reload();
  }
}

function onLogout() {
  showSessionModal.value = false;
  authStore.logout();
  if (typeof window !== 'undefined' && (window as any).handleSessionModalAction) {
    (window as any).handleSessionModalAction('logout');
  }
  router.push('/login');
}

// Expose openSessionModal globally for api.ts to call
(window as any).openSessionModal = openSessionModal;

// Global session check on mount
onMounted(async () => {
  // Only check session if not on login page and user is logged in
  if (router.currentRoute.value.path !== '/login' && authStore.token) {
    try {
      await api.get('/auth/me');
    } catch (e) {
      // Error handled globally by interceptor
    }
  }
});
</script>

<template>
  <div id="app">
    <router-view></router-view>
    <SessionExtendModal v-if="showSessionModal" @extend="onExtend" @logout="onLogout" />
  </div>
</template>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';
@import '@fortawesome/fontawesome-free/css/all.min.css';
@import './assets/css/sb-admin-2.min.css';

html, body {
  height: 100%;
}

#app {
  height: 100%;
  background-color: #f8f9fc;
}
</style>

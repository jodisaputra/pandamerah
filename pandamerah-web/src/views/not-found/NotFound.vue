<template>
  <div class="d-flex flex-column justify-content-center align-items-center min-vh-100">
    <h1 class="display-1">404</h1>
    <h2>Page Not Found</h2>
    <p class="text-muted">The page you are looking for does not exist.</p>
    <router-link to="/login" class="btn btn-primary mt-3">Go to Login</router-link>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.display-1 {
  font-size: 6rem;
  font-weight: bold;
}
</style> 
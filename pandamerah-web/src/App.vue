<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div id="app">
    <router-view></router-view>
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

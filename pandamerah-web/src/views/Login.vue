<template>
  <div class="container min-vh-100 d-flex justify-content-center align-items-center">
    <div class="row justify-content-center w-100">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg">
          <div class="card-body p-0">
            <div class="row align-items-center min-vh-50" style="min-height: 500px;">
              <div class="col-lg-6 d-none d-lg-flex login-bg-cover"></div>
              <div class="col-lg-6 d-flex align-items-center justify-content-center">
                <div class="p-5 w-100">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                  </div>
                  <div v-if="typeof authStore.error === 'string' && authStore.error" class="alert alert-danger text-center" role="alert">
                    {{ authStore.error }}
                  </div>
                  <form class="user" @submit.prevent="handleLogin">
                    <div class="form-group">
                      <input type="email" class="form-control form-control-user" v-model="email"
                        placeholder="Enter Email Address..." />
                      <div v-if="authStore.error && typeof authStore.error === 'object' && authStore.error.email" class="text-danger small mt-1">
                        {{ Array.isArray(authStore.error.email) ? authStore.error.email[0] : authStore.error.email }}
                      </div>
                    </div>
                    <div class="form-group">
                      <input type="password" class="form-control form-control-user" v-model="password"
                        placeholder="Password" />
                      <div v-if="authStore.error && typeof authStore.error === 'object' && authStore.error.password" class="text-danger small mt-1">
                        {{ Array.isArray(authStore.error.password) ? authStore.error.password[0] : authStore.error.password }}
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="custom-control custom-checkbox small">
                        <input type="checkbox" class="custom-control-input" id="customCheck" />
                        <label class="custom-control-label" for="customCheck">Remember Me</label>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-user btn-block" :disabled="authStore.loading">
                      {{ authStore.loading ? 'Loading...' : 'Login' }}
                    </button>
                  </form>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const success = await authStore.login(email.value, password.value)
  if (success) {
    router.push('/dashboard')
  }
}
</script>

<style scoped>
.login-bg-cover {
  background: url('../assets/img/pandamerah-white.png') center center no-repeat;
  background-size: cover;
  width: 100%;
  min-height: 500px;
  border-top-left-radius: 0.75rem;
  border-bottom-left-radius: 0.75rem;
}

.card {
  border-radius: 0.75rem;
}
</style>
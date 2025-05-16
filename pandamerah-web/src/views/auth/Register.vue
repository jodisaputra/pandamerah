<template>
  <div class="container">
    <div class="card o-hidden border-0 shadow-lg my-5">
      <div class="card-body p-0">
        <div class="row">
          <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
          <div class="col-lg-7">
            <div class="p-5">
              <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
              </div>
              <form class="user" @submit.prevent="handleRegister">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-user"
                    v-model="name"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control form-control-user"
                    v-model="email"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="password"
                      class="form-control form-control-user"
                      v-model="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div class="col-sm-6">
                    <input
                      type="password"
                      class="form-control form-control-user"
                      v-model="confirmPassword"
                      placeholder="Repeat Password"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  class="btn btn-primary btn-user btn-block"
                  :disabled="authStore.loading"
                >
                  {{ authStore.loading ? 'Loading...' : 'Register Account' }}
                </button>
              </form>
              <hr />
              <div class="text-center">
                <router-link class="small" to="/login">Already have an account? Login!</router-link>
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

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }
  
  const success = await authStore.register(name.value, email.value, password.value)
  if (success) {
    router.push('/dashboard')
  }
}
</script>

<style scoped>
.bg-register-image {
  background: url('https://source.unsplash.com/Mv9hjnEUHR4/600x800');
  background-position: center;
  background-size: cover;
}
</style> 
<template>
  <Layout>
    <div class="py-4">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card shadow-sm">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Create Menu Category</h5>
              <router-link to="/menu-categories" class="btn btn-sm btn-outline-secondary">Back</router-link>
            </div>
            <div class="card-body">
              <div v-if="error" class="alert alert-danger">{{ error }}</div>
              <form @submit.prevent="handleSubmit">
                <div class="form-group mb-3">
                  <label for="name">Name</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    required
                  >
                </div>
                <div class="form-group mb-3">
                  <label for="status">Status</label>
                  <select
                    id="status"
                    v-model="form.status"
                    class="form-control"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div class="d-flex justify-content-end">
                  <button type="submit" class="btn btn-primary">Create</button>
                </div>
              </form>
              <div v-if="success" class="alert alert-success mt-3">Category created successfully!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '../../layouts/Layout.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMenuCategoryStore } from '../../stores/menuCategory';

const router = useRouter();
const store = useMenuCategoryStore();

const error = ref<string | null>(null);
const success = ref(false);
const form = ref({
  name: '',
  status: 'active' as 'active' | 'inactive',
});

const handleSubmit = async () => {
  try {
    await store.createMenuCategory(form.value.name, form.value.status);
    success.value = true;
    setTimeout(() => {
      router.push('/menu-categories');
    }, 1200);
  } catch (e) {
    error.value = 'Failed to create category.';
  }
};
</script> 
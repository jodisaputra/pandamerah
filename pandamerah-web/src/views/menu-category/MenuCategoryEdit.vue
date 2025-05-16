<template>
  <Layout>
    <div class="py-4">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card shadow-sm">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Edit Menu Category</h5>
              <router-link to="/menu-categories" class="btn btn-sm btn-outline-secondary">Back</router-link>
            </div>
            <div class="card-body">
              <div v-if="loading" class="text-center py-4">Loading...</div>
              <div v-if="error" class="alert alert-danger">{{ error }}</div>
              <form v-if="!loading" @submit.prevent="handleSubmit">
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
                  <button type="submit" class="btn btn-primary">Update</button>
                </div>
              </form>
              <div v-if="success" class="alert alert-success mt-3">Category updated successfully!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '../../layouts/Layout.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMenuCategoryStore } from '../../stores/menuCategory';
import type { MenuCategory } from '../../types/menuCategory';

const route = useRoute();
const router = useRouter();
const store = useMenuCategoryStore();

const loading = ref(true);
const error = ref<string | null>(null);
const success = ref(false);
const form = ref({
  name: '',
  status: 'active' as 'active' | 'inactive',
});

const fetchCategory = async () => {
  loading.value = true;
  error.value = null;
  try {
    const id = Number(route.params.id);
    const category = store.menuCategories.find(c => c.id === id);
    if (category) {
      form.value.name = category.name;
      form.value.status = category.status;
    } else {
      // Optionally fetch from API if not in store
      await store.fetchMenuCategories();
      const fresh = store.menuCategories.find(c => c.id === id);
      if (fresh) {
        form.value.name = fresh.name;
        form.value.status = fresh.status;
      } else {
        error.value = 'Category not found.';
      }
    }
  } catch (e) {
    error.value = 'Failed to load category.';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCategory);

const handleSubmit = async () => {
  const id = Number(route.params.id);
  try {
    await store.updateMenuCategory(id, form.value.name, form.value.status);
    success.value = true;
    setTimeout(() => {
      router.push('/menu-categories');
    }, 1200);
  } catch (e) {
    error.value = 'Failed to update category.';
  }
};
</script> 
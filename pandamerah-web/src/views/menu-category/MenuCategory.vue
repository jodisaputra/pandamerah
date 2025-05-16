<template>
  <Layout>
    <div class="py-4">
      <div class="card shadow-sm mb-4">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h1 class="h5 font-weight-bold mb-0">Menu Categories</h1>
          <router-link to="/menu-categories/create" class="btn btn-outline-primary">
            Add New Category
          </router-link>
        </div>
        <div class="card-body">
          <!-- Search and Rows Per Page Controls -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <label class="mr-2">Show</label>
              <select v-model.number="rowsPerPage" class="form-control d-inline-block w-auto mr-2">
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
              </select>
              <span>entries per page</span>
            </div>
            <div>
              <input v-model="search" @input="onSearch" type="text" class="form-control" placeholder="Search by name..." style="width: 200px;" />
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="store.loading" class="text-center py-4">
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>

          <!-- Error State -->
          <div v-if="store.error" class="alert alert-danger mb-4">
            {{ store.error }}
          </div>

          <!-- Normal Table -->
          <div class="table-responsive">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cat in filteredCategories" :key="cat.id">
                  <td>{{ cat.name }}</td>
                  <td>
                    <span :class="cat.status === 'active' ? 'badge badge-success' : 'badge badge-danger'">
                      {{ cat.status }}
                    </span>
                  </td>
                  <td>{{ new Date(cat.createdAt).toLocaleString() }}</td>
                  <td>
                    <router-link
                      :to="`/menu-categories/${cat.id}/edit`"
                      class="btn btn-sm btn-primary mr-2"
                    >
                      Edit
                    </router-link>
                    <button
                      @click="() => confirmAndDelete(cat.id)"
                      class="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                <tr v-if="!filteredCategories.length && !store.loading">
                  <td colspan="4" class="text-center">No categories found.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination Controls -->
          <div class="d-flex justify-content-between align-items-center mt-3">
            <div>
              Showing {{ store.pagination.total ? ((store.pagination.currentPage - 1) * store.pagination.limit + 1) : 0 }}
              to {{ Math.min(store.pagination.currentPage * store.pagination.limit, store.pagination.total) }}
              of {{ store.pagination.total }} entries
            </div>
            <nav v-if="store.pagination.totalPages > 1">
              <ul class="pagination mb-0">
                <li class="page-item" :class="{ disabled: store.pagination.currentPage === 1 }">
                  <button class="page-link" @click="changePage(store.pagination.currentPage - 1)" :disabled="store.pagination.currentPage === 1">&laquo;</button>
                </li>
                <li
                  v-for="page in store.pagination.totalPages"
                  :key="page"
                  class="page-item"
                  :class="{ active: store.pagination.currentPage === page }"
                >
                  <button class="page-link" @click="changePage(page)">{{ page }}</button>
                </li>
                <li class="page-item" :class="{ disabled: store.pagination.currentPage === store.pagination.totalPages }">
                  <button class="page-link" @click="changePage(store.pagination.currentPage + 1)" :disabled="store.pagination.currentPage === store.pagination.totalPages">&raquo;</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '../../layouts/Layout.vue'
import { ref, onMounted, watch, computed } from 'vue';
import { useMenuCategoryStore } from '../../stores/menuCategory';
import { useRouter } from 'vue-router';

const store = useMenuCategoryStore();
const router = useRouter();

const rowsPerPage = ref(10);
const search = ref('');
let searchTimeout: any = null;

const fetchData = async (page = 1) => {
  await store.fetchMenuCategories(page, rowsPerPage.value);
};

onMounted(async () => {
  await fetchData();
});

watch(rowsPerPage, async () => {
  await fetchData(1);
});

const onSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {}, 200); // No backend fetch, just debounce for UX
};

const filteredCategories = computed(() => {
  if (!search.value.trim()) return store.menuCategories;
  const term = search.value.trim().toLowerCase();
  return store.menuCategories.filter(cat =>
    [cat.name, cat.status, new Date(cat.createdAt).toLocaleString()]
      .some(field => field && field.toString().toLowerCase().includes(term))
  );
});

const handleDelete = async (id: number) => {
  try {
    await store.deleteMenuCategory(id);
    await fetchData(store.pagination.currentPage);
  } catch (error) {
    // error already handled in store
  }
};

function confirmAndDelete(id: number) {
  if (window.confirm('Are you sure you want to delete this category?')) {
    handleDelete(id);
  }
}

function changePage(page: number) {
  if (page >= 1 && page <= store.pagination.totalPages) {
    fetchData(page);
  }
}
</script> 
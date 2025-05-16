import { defineStore } from 'pinia';
import api from '../config/api';
import type { MenuCategory, MenuCategoryResponse } from '../types/menuCategory';

export const useMenuCategoryStore = defineStore('menuCategory', {
  state: () => ({
    menuCategories: [] as MenuCategory[],
    pagination: {
      total: 0,
      totalPages: 0,
      currentPage: 1,
      limit: 10,
      hasNextPage: false,
      hasPrevPage: false
    },
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchMenuCategories(page = 1, limit = 10, search = '') {
      this.loading = true;
      try {
        let url = `/menu-categories?page=${page}&limit=${limit}`;
        const response = await api.get<MenuCategoryResponse>(url);
        console.log('Fetched menuCategories:', response.data.data);
        this.menuCategories = Array.isArray(response.data.data)
          ? response.data.data.map(cat => ({ ...cat, actions: '' }))
          : [];
        this.pagination = response.data.pagination;
        this.error = null;
      } catch (error) {
        this.error = 'Failed to fetch menu categories';
        console.error('Error fetching menu categories:', error);
        this.menuCategories = [];
      } finally {
        this.loading = false;
      }
    },

    async createMenuCategory(name: string, status: 'active' | 'inactive') {
      this.loading = true;
      try {
        const response = await api.post<MenuCategory>('/menu-categories', { name, status });
        await this.fetchMenuCategories(this.pagination.currentPage, this.pagination.limit);
        return response.data;
      } catch (error) {
        this.error = 'Failed to create menu category';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateMenuCategory(id: number, name: string, status: 'active' | 'inactive') {
      this.loading = true;
      try {
        const response = await api.put<MenuCategory>(`/menu-categories/${id}`, { name, status });
        await this.fetchMenuCategories(this.pagination.currentPage, this.pagination.limit);
        return response.data;
      } catch (error) {
        this.error = 'Failed to update menu category';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteMenuCategory(id: number) {
      this.loading = true;
      try {
        await api.delete(`/menu-categories/${id}`);
        if (this.menuCategories.length === 1 && this.pagination.currentPage > 1) {
          await this.fetchMenuCategories(this.pagination.currentPage - 1, this.pagination.limit);
        } else {
          await this.fetchMenuCategories(this.pagination.currentPage, this.pagination.limit);
        }
      } catch (error) {
        this.error = 'Failed to delete menu category';
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
}); 
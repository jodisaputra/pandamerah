export interface MenuCategory {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface MenuCategoryPagination {
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface MenuCategoryResponse {
  data: MenuCategory[];
  pagination: MenuCategoryPagination;
} 
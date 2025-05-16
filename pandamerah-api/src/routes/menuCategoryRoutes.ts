import express from 'express';
import {
  createMenuCategory,
  getMenuCategories,
  getMenuCategoryById,
  updateMenuCategory,
  deleteMenuCategory,
} from '../controllers/menuCategoryController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();

// Protect all routes with JWT authentication
router.use(authenticateJWT);

// Create a new menu category
router.post('/', createMenuCategory);

// Get all menu categories
router.get('/', getMenuCategories);

// Get a single menu category by ID
router.get('/:id', getMenuCategoryById);

// Update a menu category
router.put('/:id', updateMenuCategory);

// Delete a menu category
router.delete('/:id', deleteMenuCategory);

export default router;
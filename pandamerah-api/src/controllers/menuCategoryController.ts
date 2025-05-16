import { Request, Response } from 'express';
import MenuCategory from '../models/MenuCategory';
import { Op } from 'sequelize';

// Create a new menu category
export const createMenuCategory = async (req: Request, res: Response) => {
  try {
    const { name, status } = req.body;
    const menuCategory = await MenuCategory.create({ name, status });
    res.status(201).json(menuCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error creating menu category', error });
  }
};

// Get all menu categories with pagination
export const getMenuCategories = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const search = (req.query.search as string) || '';

    const where: any = {};
    if (search && search.trim() !== '') {
      where.name = { [Op.like]: `%${search.trim()}%` };
    }

    const { count, rows: menuCategories } = await MenuCategory.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      data: menuCategories,
      pagination: {
        total: count,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu categories', error });
  }
};

// Get a single menu category by ID
export const getMenuCategoryById = async (req: Request, res: Response) => {
  try {
    const menuCategory = await MenuCategory.findByPk(req.params.id);
    if (!menuCategory) {
      return res.status(404).json({ message: 'Menu category not found' });
    }
    res.json(menuCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu category', error });
  }
};

// Update a menu category
export const updateMenuCategory = async (req: Request, res: Response) => {
  try {
    const { name, status } = req.body;
    const menuCategory = await MenuCategory.findByPk(req.params.id);
    
    if (!menuCategory) {
      return res.status(404).json({ message: 'Menu category not found' });
    }

    await menuCategory.update({ name, status });
    res.json(menuCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error updating menu category', error });
  }
};

// Delete a menu category
export const deleteMenuCategory = async (req: Request, res: Response) => {
  try {
    const menuCategory = await MenuCategory.findByPk(req.params.id);
    
    if (!menuCategory) {
      return res.status(404).json({ message: 'Menu category not found' });
    }

    await menuCategory.destroy();
    res.json({ message: 'Menu category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu category', error });
  }
}; 
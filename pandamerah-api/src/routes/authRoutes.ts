import express from 'express';
import { getUsers, register, getUserById, login, updateUser, refresh } from '../controllers/authController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.post('/', register);
router.post('/login', login);
router.post('/refresh', refresh);

// Protected routes
router.get('/', authenticateJWT, getUsers);
router.get('/:id', authenticateJWT, getUserById);
router.put('/:id', authenticateJWT, updateUser);

export default router;
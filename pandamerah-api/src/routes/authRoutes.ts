import express from 'express';
import { getUsers, register, getUserById, login, updateUser } from '../controllers/authController';

const router = express.Router();

router.get('/', getUsers);
router.post('/', register);
router.get('/:id', getUserById);
router.post('/login', login);
router.put('/:id', updateUser);

export default router;
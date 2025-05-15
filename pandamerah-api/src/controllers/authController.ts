import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ errors: { email: !email ? "Email is required" : undefined, password: !password ? "Password is required" : undefined } });
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, (user as any).password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign(
            { id: (user as any).id, email: (user as any).email },
            process.env.JWT_SECRET || 'password',
            { expiresIn: '1h' }
        );
        const { password: _, ...userData } = user.toJSON();
        res.json({ user: userData, token });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            ...req.body,
            password: hashedPassword,
        });
        const userTyped = user as any; // or as User & { id: number; email: string }
        const token = jwt.sign(
            { id: userTyped.id, email: userTyped.email },
            process.env.JWT_SECRET || 'password',
            { expiresIn: '1h' }
        );

        // Return user data and token (omit password)
        const { password, ...userData } = user.toJSON();
        res.status(201).json({ user: userData, token });
    } catch (error: any) {
        if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
            const errors: Record<string, string> = {};
            error.errors.forEach((err: any) => {
                // Remove 'User.' from the message
                errors[err.path] = err.message.replace(/^User\./, '');
            });
            return res.status(400).json({ errors });
        }
        res.status(400).json({ message: error.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (name) (user as any).name = name;
        if (email) (user as any).email = email;
        if (password) (user as any).password = await bcrypt.hash(password, 10);
        await user.save();
        const { password: _, ...userData } = user.toJSON();
        res.json({ user: userData });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
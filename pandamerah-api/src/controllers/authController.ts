import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';
const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || 'password';

// Helper to generate tokens
function generateAccessToken(user: any) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );
}
function generateRefreshToken(user: any) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
}

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
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        // Set refresh token in HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        const { password: _, ...userData } = user.toJSON();
        res.json({ user: userData, token: accessToken });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const refresh = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'No refresh token' });
  try {
    const user = jwt.verify(token, REFRESH_TOKEN_SECRET) as any;
    const accessToken = generateAccessToken(user);
    res.json({ token: accessToken });
  } catch (err) {
    res.status(401).json({ message: 'Invalid refresh token' });
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
            { id: userTyped.id, email: userTyped.email, name: userTyped.name },
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
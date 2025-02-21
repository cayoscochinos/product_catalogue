import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, LoginCredentials, RegisterCredentials } from '../types/user.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';


const users: User[] = [{
  id: 1,
  email: "test@example.com",
  password: "password123",
  firstName: "Test"
}];

export const register = async (req: Request, res: Response) => {
  const { email, password, firstName }: RegisterCredentials = req.body;

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser: User = {
    id: users.length + 1,
    email,
    password, 
    firstName
  };

  users.push(newUser);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, firstName: newUser.firstName },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.status(201).json({ token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: LoginCredentials = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, firstName: user.firstName },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
}; 
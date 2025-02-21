import api from './api';
import { LoginCredentials, RegisterCredentials } from '../types/auth';

export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await api.post('/api/login', credentials);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error('Invalid email or password');
    }
    throw new Error('An error occurred during login');
  }
};

export const register = async (credentials: RegisterCredentials) => {
  try {
    const response = await api.post('/api/register', credentials);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error('User already exists');
    }
    throw new Error('An error occurred during registration');
  }
}; 
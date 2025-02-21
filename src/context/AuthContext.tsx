import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import storage from '../services/storage';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!storage.getToken());
  const history = useHistory();

  const login = (token: string) => {
    storage.setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    storage.removeToken();
    setIsAuthenticated(false);
    history.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
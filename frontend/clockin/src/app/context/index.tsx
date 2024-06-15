'use client';

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import axiosInstance from '../utils/axios';

type AuthContextProps = {
  isAuthenticated: boolean;
  loading: boolean;
  register: (
    username: string,
    email: string,
    password1: string,
    password2: string
  ) => Promise<void>;
  login: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for token on component mount
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const register = async (
    username: string,
    email: string,
    password1: string,
    password2: string
  ) => {
    const response = await axiosInstance.post('auth/registration/', {
      username,
      email,
      password1,
      password2,
    });
    if (response.status === 204) {
      await login(username, email, password1);
    }
  };

  const login = async (username: string, email: string, password: string) => {
    const response = await axiosInstance.post('auth/login/', {
      username,
      email,
      password,
    });
    if (response.data.key) {
      localStorage.setItem('token', response.data.key);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

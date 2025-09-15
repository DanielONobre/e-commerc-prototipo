// frontend/src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carrega o utilizador do localStorage quando a aplicação inicia
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Função de Login
  const login = async (email, password) => {
    try {
      const { data } = await api.post('/users/login', { email, password });
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      return data;
    } catch (error) {
      console.error("Erro no login:", error.response.data.message);
      throw error;
    }
  };

  // Função de Registo
  const register = async (name, email, password) => {
    try {
      const { data } = await api.post('/users/register', { name, email, password });
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      return data;
    } catch (error) {
      console.error("Erro no registo:", error.response.data.message);
      throw error;
    }
  };

  // Função de Logout
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user, // Uma forma fácil de verificar se o utilizador está logado
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
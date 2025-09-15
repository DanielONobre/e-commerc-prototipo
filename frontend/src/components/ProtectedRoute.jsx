// frontend/src/components/ProtectedRoute.jsx

import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // Enquanto verifica a autenticação, não renderiza nada (ou um spinner)
  if (loading) {
    return <div>A verificar autenticação...</div>;
  }

  // Se estiver autenticado, renderiza o componente filho (a página de checkout)
  if (isAuthenticated) {
    return <Outlet />;
  }

  // Se não estiver autenticado, redireciona para a página de login
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
// frontend/src/components/AdminRoute.jsx

import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = () => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>A verificar permissões...</div>;
  }

  if (isAuthenticated && user.role === 'admin') {
    return <Outlet />; // Se for admin, renderiza a página
  }

  // Se não for admin, redireciona para a home page
  return <Navigate to="/" replace />;
};

export default AdminRoute;
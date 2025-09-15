// frontend/src/App.jsx (ATUALIZADO)

import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute'; // <-- 1. IMPORTE
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage'; // <-- 2. IMPORTE
import AdminRoute from './components/AdminRoute'; // <-- IMPORTE
import ProductListPage from './pages/ProductListPage'; // <-- IMPORTE
import ProductEditPage from './pages/ProductEditPage'; // <-- IMPORTE

function App() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow w-full">
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rotas Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<CheckoutPage />} />
          {/* Rotas de Administrador */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="productlist" element={<ProductListPage />} />
            <Route path="product/:id/edit" element={<ProductEditPage />} />
          </Route>  
          </Route>
           {/* No futuro, outras rotas protegidas (ex: /perfil) podem vir aqui */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
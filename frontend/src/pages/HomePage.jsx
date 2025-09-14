// frontend/src/pages/HomePage.jsx (ATUALIZADO E LIMPO)

import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../context/CartContext';

const HomePage = () => {
  // ... (useState e useEffect continuam iguais) ...
  const { cartItems } = useContext(CartContext);

  // ...

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-8">
        Nossos Produtos
        <span className="text-lg font-normal ml-4 text-blue-600">
          (Itens no carrinho: {cartItems.length})
        </span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          // Apenas passe o product. O card agora é independente!
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
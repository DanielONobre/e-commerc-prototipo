// frontend/src/pages/HomePage.jsx (COM PADDING CORRETO)

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (err) {
        setError('Falha ao carregar produtos.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center p-8">Carregando...</p>;
  if (error) return <p className="text-center p-8 text-red-500">{error}</p>;

  return (
    // Este div agora controla o espaçamento interno da página
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Nossos Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
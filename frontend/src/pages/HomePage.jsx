// frontend/src/pages/HomePage.jsx (MODIFICADO PARA TESTE)

import React, { useState, useEffect, useContext } from 'react'; // 1. IMPORTE O USECONTEXT
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../context/CartContext'; // 2. IMPORTE O CARTCONTEXT

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { cartItems } = useContext(CartContext); // 3. ACESSE OS DADOS DO CARRINHO

  // ... (o useEffect continua o mesmo)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (err) {
        setError('Falha ao carregar produtos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ... (as verificações de loading e error continuam as mesmas)
  if (loading) { /* ... */ }
  if (error) { /* ... */ }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-8">
        Nossos Produtos
        {/* 4. EXIBA A CONTAGEM DE ITENS */}
        <span className="text-lg font-normal ml-4 text-blue-600">
          (Itens no carrinho: {cartItems.length})
        </span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
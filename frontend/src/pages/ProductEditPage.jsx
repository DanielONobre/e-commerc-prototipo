// frontend/src/pages/ProductEditPage.jsx (VERSÃO COMPLETA)

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const ProductEditPage = () => {
  const { id: productId } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Se houver um ID na URL, estamos a editar. Vamos buscar os dados.
    if (productId !== 'new') {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const { data } = await api.get(`/products/${productId}`);
          setName(data.name);
          setPrice(data.price);
          setImageUrl(data.imageUrl);
          setStock(data.stock);
          setDescription(data.description);
        } catch (error) {
          console.error("Erro ao carregar o produto", error);
        }
        setLoading(false);
      };
      fetchProduct();
    }
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = { name, price, imageUrl, stock, description };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      if (productId !== 'new') {
        // Atualizar produto existente
        await api.put(`/products/${productId}`, productData, config);
        alert('Produto atualizado com sucesso!');
      } else {
        // Criar novo produto
        await api.post(`/products`, productData, config);
        alert('Produto criado com sucesso!');
      }
      setLoading(false);
      navigate('/admin/productlist');
    } catch (error) {
      console.error("Erro ao salvar produto", error);
      alert('Falha ao salvar produto.');
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">{productId === 'new' ? 'Criar Novo Produto' : 'Editar Produto'}</h1>
      {loading ? <p>A carregar...</p> : (
        <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700">Nome</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Preço</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">URL da Imagem</label>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Stock</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descrição</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
            {productId === 'new' ? 'Criar Produto' : 'Atualizar Produto'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductEditPage;
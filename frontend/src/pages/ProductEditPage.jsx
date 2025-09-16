// frontend/src/pages/ProductEditPage.jsx (VERSÃO FINAL COMPLETA)

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
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

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await api.post('/upload', formData, config);
      setImageUrl(data.image);
      setUploading(false);
    } catch (error) {
      console.error('Erro no upload da imagem:', error);
      alert('Falha no upload da imagem.');
      setUploading(false);
    }
  };

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
        await api.put(`/products/${productId}`, productData, config);
        alert('Produto atualizado com sucesso!');
      } else {
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
      {/* ↓↓↓ TÍTULO COM A COR CORRIGIDA ↓↓↓ */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {productId === 'new' ? 'Criar Novo Produto' : 'Editar Produto'}
      </h1>
      {loading ? <p>A carregar...</p> : (
        <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg shadow-md">
          {/* ↓↓↓ TODOS OS CAMPOS PRESENTES ↓↓↓ */}
          <div className="mb-4">
            <label className="block text-gray-700">Nome</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Preço</label>
            <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">URL da Imagem</label>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Ou Envie uma Imagem</label>
            <input type="file" onChange={uploadFileHandler} className="w-full p-2 border rounded" />
            {uploading && <p className="text-blue-500">A enviar imagem...</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Stock</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descrição</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600" disabled={uploading}>
            {productId === 'new' ? 'Criar Produto' : 'Atualizar Produto'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductEditPage;
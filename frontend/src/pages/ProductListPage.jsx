// frontend/src/pages/ProductListPage.jsx (VERSÃO COM CORES CORRIGIDAS)

import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };
    fetchProducts();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Tem a certeza que quer apagar este produto?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        await api.delete(`/products/${id}`, config);
        setProducts(products.filter((p) => p._id !== id));
        alert('Produto apagado com sucesso!');
      } catch (error) {
        console.error("Erro ao apagar o produto:", error);
        alert('Falha ao apagar o produto.');
      }
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerir Produtos</h1>
        <Link to="/admin/product/new/edit">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Criar Produto
          </button>
        </Link>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left font-semibold text-gray-600">ID</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-600">NOME</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-600">PREÇO</th>
              <th className="py-2 px-4 text-center font-semibold text-gray-600">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                {/* ↓↓↓ ADICIONE A CLASSE DE COR DE TEXTO AQUI ↓↓↓ */}
                <td className="py-2 px-4 text-gray-900">{product._id}</td>
                <td className="py-2 px-4 text-gray-900">{product.name}</td>
                <td className="py-2 px-4 text-gray-900">R$ {product.price}</td>
                <td className="py-2 px-4 text-center">
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">Editar</button>
                  </Link>
                  <button onClick={() => deleteHandler(product._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListPage;
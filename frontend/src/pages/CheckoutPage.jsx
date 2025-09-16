// frontend/src/pages/CheckoutPage.jsx (VERSÃO CORRIGIDA)

import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // <-- 1. IMPORTAÇÃO CORRIGIDA
import api from '../services/api';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // <-- A função agora está definida

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Por favor, faça login para finalizar o pedido.');
      return;
    }
    try {
      // 2. CORREÇÃO NA ESTRUTURA DOS DADOS ENVIADOS
      const orderData = {
        orderItems: cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            product: item._id, // O back-end precisa desta referência ao produto original
        })),
        shippingAddress: { address, city, postalCode, country },
        totalPrice: total,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      await api.post('/orders', orderData, config);

      alert('Pedido realizado com sucesso!');
      clearCart();
      navigate('/');
    } catch (error) {
      console.error('Erro ao finalizar o pedido:', error);
      alert('Ocorreu um erro ao finalizar o seu pedido.');
    }
  };

  return (
    <div className="w-full p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Finalizar Compra</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coluna do Formulário */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Endereço de Entrega</h2>
            <form id="checkout-form" onSubmit={placeOrderHandler}>
              <div className="mb-4">
                <label className="block text-gray-700">Endereço</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 border rounded" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Cidade</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full p-2 border rounded" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Código Postal</label>
                <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full p-2 border rounded" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">País</label>
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full p-2 border rounded" required />
              </div>
            </form>
          </div>

          {/* Coluna do Resumo do Pedido */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Resumo do Pedido</h2>
            <div className="space-y-2 mb-4 border-b pb-2">
              {cartItems.map(item => (
                <div key={item._id} className="flex justify-between">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>R$ {(item.price * item.quantity).toFixed(2).replace('.',',')}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>R$ {total.toFixed(2).replace('.',',')}</span>
            </div>
            <button type="submit" form="checkout-form" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded mt-6">
              Finalizar e Pagar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
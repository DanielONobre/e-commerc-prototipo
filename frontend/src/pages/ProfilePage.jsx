// frontend/src/pages/ProfilePage.jsx (VERSÃO FINAL)

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const ProfilePage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // ... (useEffect continua igual)
  }, [user]);

  if (loading) { /* ... */ }

  return (
    <div className="w-full p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Meus Pedidos</h1>
      {orders.length === 0 ? (
        <div className="mx-auto max-w-2xl bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-700">Você ainda não fez nenhum pedido.</p>
        </div>
      ) : (
        <div className="space-y-4 max-w-4xl mx-auto">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center border-b pb-2 mb-2">
                <div>
                  <h2 className="font-bold text-gray-900">Pedido #{order._id.substring(0, 8)}</h2>
                  <p className="text-sm text-gray-500">
                    Feito em: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  {/* Lendo totalPrice */}
                  <p className="font-bold text-lg text-gray-900">Total: R$ {(order.totalPrice || 0).toFixed(2).replace('.', ',')}</p>
                  <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {order.status || 'Pendente'}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-gray-800">Itens:</h3>
                {Array.isArray(order.orderItems) && order.orderItems.map((item, index) => (
                  <div key={item._id || index} className="flex justify-between text-gray-700">
                    <span>{item.name || 'Item desconhecido'} (x{item.quantity || 1})</span>
                    <span>R$ {((item.price || 0) * (item.quantity || 1)).toFixed(2).replace('.', ',')}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
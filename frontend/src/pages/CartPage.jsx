// frontend/src/pages/CartPage.jsx (VERSÃO CORRIGIDA FINAL)

import React, { useContext } from 'react';
// 1. IMPORTE TUDO O QUE PRECISAMOS: LINK e USENAVIGATE
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  // 2. PEGUE TODAS AS FUNÇÕES DO CONTEXTO, INCLUINDO AS QUE FALTAVAM
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const checkoutHandler = () => {
    // Agora o navigate está definido e irá funcionar
    navigate('/login?redirect=/checkout'); // Se não estiver logado, vai para login, depois para checkout
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">O seu carrinho está vazio.</h1>
        <Link to="/" className="text-blue-500 hover:underline">
          Voltar para a loja
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Seu Carrinho</h1>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">Produto</th>
                <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">Preço</th>
                <th className="py-3 px-4 border-b text-center font-semibold text-gray-700">Quantidade</th>
                <th className="py-3 px-4 border-b text-right font-semibold text-gray-700">Subtotal</th>
                <th className="py-3 px-4 border-b text-center font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b text-gray-900">{item.name}</td>
                  <td className="py-3 px-4 border-b text-gray-900">R$ {item.price.toFixed(2).replace('.', ',')}</td>
                  <td className="py-3 px-4 border-b text-gray-900">
                    <div className="flex items-center justify-center">
                      <button onClick={() => decreaseQuantity(item._id)} className="border bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded-l">-</button>
                      <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item._id)} className="border bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded-r">+</button>
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b text-gray-900 text-right">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</td>
                  <td className="py-3 px-4 border-b text-center">
                    <button onClick={() => removeFromCart(item._id)} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded">Remover</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-6">
          <div className="w-full md:w-1/3">
            <div className="flex justify-between text-lg font-semibold text-gray-800 border-t pt-4">
              <span>Total:</span>
              <span>R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
            {/* O botão agora chama a função checkoutHandler */}
            <button onClick={checkoutHandler} className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded mt-4">
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
// frontend/src/context/CartContext.jsx

import React, { createContext, useState } from 'react';

// 1. Cria o Contexto
// Este é o contêiner que nossos componentes usarão para obter os dados.
export const CartContext = createContext();

// 2. Cria o Provedor (Provider)
// Este é o componente que vai gerenciar o estado e a lógica do carrinho.
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // O estado que guarda os itens do carrinho

  // Função para adicionar um produto ao carrinho
  const addToCart = (productToAdd) => {
    setCartItems((prevItems) => {
      // Verifica se o produto já existe no carrinho
      const existingItem = prevItems.find((item) => item._id === productToAdd._id);

      if (existingItem) {
        // Se existe, aumenta a quantidade
        return prevItems.map((item) =>
          item._id === productToAdd._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Se não existe, adiciona o novo produto com quantidade 1
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  // (Aqui, no futuro, adicionaremos funções como removeFromCart, clearCart, etc.)

  // 3. O valor que será compartilhado com todos os componentes
  const value = {
    cartItems,
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
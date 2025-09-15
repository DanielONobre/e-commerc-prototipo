// frontend/src/context/CartContext.jsx

import React, { createContext, useState, useEffect } from 'react';

// 1. Cria o Contexto
export const CartContext = createContext();

// 2. Cria o Provedor (Provider)
export const CartProvider = ({ children }) => {
  // Tenta carregar o estado inicial do localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cart');
      // Se houver dados, converte-os de volta para um objeto, senão, retorna um array vazio
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Não foi possível carregar os itens do carrinho do localStorage:", error);
      return [];
    }
  });

  // Efeito que corre sempre que o 'cartItems' é alterado
  useEffect(() => {
    // Salva o estado atual do carrinho no localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Função para adicionar um produto ao carrinho
  const addToCart = (productToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === productToAdd._id);
      if (existingItem) {
        // Se o item já existe, aumenta a sua quantidade
        return prevItems.map((item) =>
          item._id === productToAdd._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Se é um item novo, adiciona-o ao carrinho com quantidade 1
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  // Função para remover um item completamente do carrinho
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
  };

  // Função para aumentar a quantidade de um item
  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Função para diminuir a quantidade de um item (até um mínimo de 1)
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Função para esvaziar completamente o carrinho após a compra
  const clearCart = () => {
    setCartItems([]);
  };

  // 3. O valor que será partilhado com os componentes "filhos"
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
// frontend/src/main.jsx (ATUALIZADO)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // <-- 1. IMPORTE

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider> {/* <-- 2. ABRA O PROVIDER AQUI */}
        <App />
      </CartProvider> {/* <-- 3. FECHE O PROVIDER AQUI */}
    </BrowserRouter>
  </React.StrictMode>,
);
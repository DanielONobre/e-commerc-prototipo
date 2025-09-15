// frontend/src/main.jsx (ATUALIZADO)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* <-- 2. ABRA O AUTHPROVIDER */}
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider> {/* <-- 3. FECHE O AUTHPROVIDER */}
    </BrowserRouter>
  </React.StrictMode>,
);
// frontend/src/components/Header.jsx (ATUALIZADO COM MENU DE CLIQUE)

import React, { useState, useContext } from 'react'; // 1. IMPORTE O USESTATE
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false); // 2. CRIE O ESTADO DO MENU

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold hover:text-gray-300">
          DevShop
        </Link>

        <nav className="flex items-center space-x-4">
          <Link to="/cart" className="relative p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            <span>Carrinho</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <>
              {user.role === 'admin' && (
                // 3. O BOTÃO AGORA CONTROLA O ESTADO COM ONCLICK
                <div className="relative">
                  <button
                    onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                    onBlur={() => setIsAdminMenuOpen(false)} // Fecha o menu ao clicar fora
                    className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                  >
                    Admin
                  </button>
                  {/* 4. O MENU APARECE COM BASE NO ESTADO, NÃO NO HOVER */}
                  {isAdminMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                      <Link
                        to="/admin/productlist"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onMouseDown={(e) => e.preventDefault()} // Previne que o onBlur feche antes de navegar
                      >
                        Gerir Produtos
                      </Link>
                    </div>
                  )}
                </div>
              )}

              <span className="font-semibold">Olá, {user.name}</span>
              <button
                onClick={logout}
                className="p-2 bg-red-600 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="p-2 hover:text-gray-300">
                Login
              </Link>
              <Link to="/register" className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600">
                Registar
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
// frontend/src/components/ProductCard.jsx (ATUALIZADO)

import React, { useContext } from 'react'; // 1. IMPORTE O USECONTEXT
import { CartContext } from '../context/CartContext'; // 2. IMPORTE O NOSSO CONTEXTO

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext); // 3. PEGUE A FUNÇÃO ADDTOCART DO CONTEXTO

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{product.name}</h3>
        <p className="text-gray-600 mt-1">{product.description.substring(0, 60)}...</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          {/* 4. CHAME A FUNÇÃO ADDTOCART NO EVENTO ONCLICK */}
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
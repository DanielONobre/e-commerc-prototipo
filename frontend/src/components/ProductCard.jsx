// frontend/src/components/ProductCard.jsx

import React from 'react';

const ProductCard = ({ product }) => {
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
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
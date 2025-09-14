// backend/models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // O nome é obrigatório
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0, // Se não for informado, o preço é 0
    },
    imageUrl: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    // Adiciona os campos createdAt e updatedAt automaticamente
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
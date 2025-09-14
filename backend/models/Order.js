// backend/models/Order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Cria uma referência ao model 'User'
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      // Podemos detalhar mais tarde (rua, cidade, etc.)
      type: Object,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
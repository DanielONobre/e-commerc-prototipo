// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
} = require('../controllers/productController');

// Rotas
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct); // Por enquanto, criaremos apenas essas

module.exports = router;
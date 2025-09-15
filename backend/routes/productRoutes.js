// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct, // <-- importe
  deleteProduct, // <-- importe
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// Rotas
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct); // Por enquanto, criaremos apenas essas
router.post('/', protect, admin, createProduct); // Proteja a rota de criação também
router.put('/:id', protect, admin, updateProduct); // <-- adicione
router.delete('/:id', protect, admin, deleteProduct); // <-- adicione

module.exports = router;
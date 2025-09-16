// backend/routes/orderRoutes.js (VERSÃO CORRIGIDA)

const express = require('express');
const router = express.Router();

// ↓↓↓ A CORREÇÃO ESTÁ AQUI: ADICIONE getMyOrders AO IMPORT ↓↓↓
const { addOrderItems, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// As rotas existentes
router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);

module.exports = router;
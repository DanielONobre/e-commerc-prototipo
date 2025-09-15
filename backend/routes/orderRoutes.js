// backend/routes/orderRoutes.js (VERSÃO CORRETA)

const express = require('express');
const router = express.Router();
const { addOrderItems } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// A rota POST para '/' usa o middleware 'protect' e depois chama o controller 'addOrderItems'
router.post('/', protect, addOrderItems);

module.exports = router;
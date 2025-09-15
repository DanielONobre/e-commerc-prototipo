// backend/controllers/orderController.js (VERSÃO CORRETA)

const Order = require('../models/Order');

const addOrderItems = async (req, res) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;

  try {
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'Nenhum item no pedido' });
    }

    const order = new Order({
      orderItems: orderItems.map(item => ({
        ...item,
        product: item._id, // Garante que a referência do produto está correta
        _id: undefined // Remove o _id do item do carrinho para que o MongoDB crie um novo
      })),
      user: req.user._id,
      shippingAddress,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

module.exports = { addOrderItems };
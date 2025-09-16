// backend/controllers/orderController.js (VERSÃO FINAL)

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
        product: item._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      totalPrice, // <-- Usando o nome correto
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

module.exports = { addOrderItems, getMyOrders };
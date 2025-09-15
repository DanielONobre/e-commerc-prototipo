// backend/controllers/productController.js (VERSÃO COMPLETA E CORRIGIDA)

const Product = require('../models/Product');

// @desc    Buscar todos os produtos
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// @desc    Buscar um produto por ID
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// @desc    Criar um produto
// @route   POST /api/products
const createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, stock } = req.body;
    const product = new Product({ name, description, price, imageUrl, stock });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: 'Dados do produto inválidos', error: error.message });
  }
};

// @desc    Atualizar um produto
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const { name, price, description, imageUrl, stock } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.imageUrl = imageUrl || product.imageUrl;
      product.stock = stock !== undefined ? stock : product.stock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar produto', error: error.message });
  }
};

// @desc    Apagar um produto
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Produto removido' });
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Garante que todas as funções estão a ser exportadas
module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
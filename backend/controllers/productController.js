// backend/controllers/productController.js (ATUALIZADO)

const Product = require('../models/Product');

// ... (as funções getProducts e getProductById continuam iguais) ...
const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
};

// @desc    Criar um produto
// @route   POST /api/products
const createProduct = async (req, res) => {
  try { // <-- ADICIONE O TRY
    const { name, description, price, imageUrl, stock } = req.body;

    const product = new Product({
      name,
      description,
      price,
      imageUrl,
      stock,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) { // <-- ADICIONE O CATCH
    // Se houver um erro (como o de validação), ele será capturado aqui
    console.error(error); // Mostra o erro detalhado no console do back-end
    res.status(400).json({ message: 'Dados do produto inválidos', error: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct };
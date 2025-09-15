// backend/middleware/authMiddleware.js (VERSÃO COMPLETA E CORRIGIDA)

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extrai o token do cabeçalho
      token = req.headers.authorization.split(' ')[1];

      // Verifica o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Anexa o utilizador à requisição
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Continua para a próxima função
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Não autorizado, token falhou' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Não autorizado, sem token' });
  }
};

// @desc    Middleware para verificar se o utilizador é administrador
const admin = (req, res, next) => {
  // A função 'protect' já correu antes, por isso temos acesso a 'req.user'
  if (req.user && req.user.role === 'admin') {
    next(); // Se for admin, continua
  } else {
    // Se não for admin, envia um erro de "não autorizado"
    res.status(401).json({ message: 'Não autorizado como administrador' });
  }
};

// Exporta ambas as funções
module.exports = { protect, admin };
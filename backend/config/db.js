// backend/config/db.js (ATUALIZADO E LIMPO)

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Remova o segundo argumento (o objeto com as opções)
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
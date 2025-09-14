// backend/index.js (VERSÃO CORRETA E COMPLETA)

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // <-- ESTA LINHA É A CHAVE! ELA PRECISA ESTAR AQUI.

app.get('/', (req, res) => {
  res.send('API do E-commerce está no ar!');
});

// Rotas
app.use('/api/products', productRoutes); // <-- AS ROTAS VÊM DEPOIS DO MIDDLEWARE

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Olá, mundo! A API do meu e-commerce está no ar!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

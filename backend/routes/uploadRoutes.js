// backend/routes/uploadRoutes.js (VERSÃO DE DEPURAÇÃO)

const express = require('express');
const upload = require('../upload');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, admin, (req, res) => {
  // Usamos upload.single como um middleware, mas com um gestor de erros
  upload.single('image')(req, res, function (err) {
    if (err) {
      // ↓↓↓ ESTA PARTE VAI REVELAR O ERRO ↓↓↓
      console.error('ERRO DETETADO PELO MULTER/CLOUDINARY:', err);
      return res.status(500).send({ message: 'Falha no upload', error: err.message });
    }

    if (req.file) {
      res.send({
        message: 'Imagem enviada com sucesso',
        image: req.file.path,
      });
    } else {
      res.status(400).send({ message: 'Nenhum ficheiro enviado' });
    }
  });
});

module.exports = router;
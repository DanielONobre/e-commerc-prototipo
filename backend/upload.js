// backend/upload.js

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');

dotenv.config();

// Configura o Cloudinary com as suas credenciais do .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configura o armazenamento do Multer para enviar diretamente para o Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'devshop', // Nome da pasta onde as imagens serão guardadas no Cloudinary
    format: async (req, file) => 'jpg', // Formato da imagem
    public_id: (req, file) => Date.now() + '-' + file.originalname, // Nome único para o ficheiro
  },
});

// Filtro para garantir que apenas imagens são enviadas
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb({ message: 'Apenas ficheiros de imagem são permitidos!' }, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
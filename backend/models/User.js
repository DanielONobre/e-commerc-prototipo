// backend/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // O email deve ser único
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'customer' }, // 'customer' ou 'admin'
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
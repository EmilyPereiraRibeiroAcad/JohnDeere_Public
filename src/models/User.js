const mongoose = require('mongoose');

// Define o esquema para User
const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  },
  ultimoLogin: {
    type: Date
  },
  statusConta: {
    type: String,
    enum: ['ativa', 'inativa', 'suspensa'],
    default: 'ativa'
  },
  funcao: {
    type: String,
    required: true
  },
  genero: {
    type: String
  },
  fotoPerfil: {
    type: String
  }
});

// Cria e exporta o modelo 'User' usando o esquema
const User = mongoose.model('User', UserSchema);
module.exports = User;

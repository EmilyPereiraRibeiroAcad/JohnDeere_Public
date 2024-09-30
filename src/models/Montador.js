const mongoose = require('mongoose');

// Define o esquema para Montador
const MontadorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Referência para o modelo 'User'
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  totalPedidos: {
    type: Number,
    default: 0
  }
});

// Cria e exporta o modelo 'Montador' usando o esquema
const Montador = mongoose.model('Montador', MontadorSchema);
module.exports = Montador;

const mongoose = require('mongoose');

// Define o esquema para Rebocador
const RebocadorSchema = new mongoose.Schema({
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
  viagens: {
    type: Number,
    default: 0
  },
  pontuacao: {
    type: Number,
    default: 0
  }
});

// Cria e exporta o modelo 'Rebocador' usando o esquema
const Rebocador = mongoose.model('Rebocador', RebocadorSchema);
module.exports = Rebocador;

const mongoose = require('mongoose');

// Define o esquema para Pontuacao
const pontuacaoSchema = new mongoose.Schema({
  rebocadorId: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  quantidadeViagens: { 
    type: Number, 
    default: 0 
  },
  bonusTempo: { 
    type: Number, 
    default: 0 
  },
  totalPontos: { 
    type: Number, 
    default: 0 
  }
}, { timestamps: true }); // Adiciona timestamps

// Cria e exporta o modelo 'Pontuacao' usando o esquema
const Pontuacao = mongoose.model('Pontuacao', pontuacaoSchema);
module.exports = Pontuacao;

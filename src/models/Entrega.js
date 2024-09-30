const mongoose = require('mongoose');

// Define o esquema para Entrega
const EntregaSchema = new mongoose.Schema({
  idPedido: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Pedido',  // Referência para o modelo 'Pedido'
    required: true 
  },
  idEntrega: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true 
  },
  idMontador: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Referência para o modelo 'User'
    required: true 
  },
  idRebocador: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Rebocador',  // Referência para o modelo 'Rebocador'
    required: true 
  },
  rotaEntrega: { 
    type: String, 
    required: true 
  },
  tempoEstimadoEntrega: { 
    type: String, 
    required: true 
  },
  tempoRealEntrega: { 
    type: String 
  }
});

// Exportar o modelo
module.exports = mongoose.model('Entrega', EntregaSchema);

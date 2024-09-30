const mongoose = require('mongoose');

// Define o esquema para Pedido
const PedidoSchema = new mongoose.Schema({
  idPedido: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true 
  },
  idMontador: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Referência para o modelo 'User'
    required: true 
  },
  descricao: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pendente', 'em_andamento', 'concluido'], 
    default: 'pendente', 
    required: true 
  },
});

const Pedido = mongoose.model('Pedido', PedidoSchema);
module.exports = Pedido;

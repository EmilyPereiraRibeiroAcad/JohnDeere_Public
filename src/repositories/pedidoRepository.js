const Pedido = require('../models/Pedido');

class PedidoRepository {
  async create(pedidoData) {
    const pedido = new Pedido(pedidoData);
    await pedido.save();
    return pedido;
  }

  async getByMontador(montadorId) {
    return Pedido.find({ idMontador: montadorId });
  }

  async countTotal() {
    return Pedido.countDocuments();
  }

  async findById(pedidoId) {
    return Pedido.findById(pedidoId);
  }

  async delete(pedidoId) {
    return Pedido.findByIdAndDelete(pedidoId);
  }
}

module.exports = new PedidoRepository();

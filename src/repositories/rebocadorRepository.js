const Rebocador = require('../models/Rebocador');
const Pedido = require('../models/Pedido'); // Adicione a importação do modelo Pedido

class RebocadorRepository {
  async create(rebocadorData) {
    const rebocador = new Rebocador(rebocadorData);
    await rebocador.save();
    return rebocador;
  }

  async findByUserId(userId) {
    return Rebocador.findOne({ userId });
  }

  async updateByUserId(userId, newData) {
    return Rebocador.findOneAndUpdate({ userId }, newData, { new: true });
  }

  async listPedidos(rebocadorId) {
    try {
      const pedidos = await Pedido.find({ rebocadorId });
      return pedidos;
    } catch (error) {
      throw new Error('Erro ao listar pedidos por rebocadorId: ' + error.message);
    }
  }
}

module.exports = new RebocadorRepository();

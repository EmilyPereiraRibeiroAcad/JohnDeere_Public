const Montador = require('../models/Montador');

class MontadorRepository {
  async findById(montadorId) {
    return Montador.findById(montadorId);
  }

  async updateTotalPedidos(montadorId, increment) {
    return Montador.findByIdAndUpdate(
      montadorId,
      { $inc: { totalPedidos: increment } },
      { new: true }
    );
  }
}

module.exports = new MontadorRepository();

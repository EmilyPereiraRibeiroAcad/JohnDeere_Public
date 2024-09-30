const Entrega = require('../models/Entrega');

class EntregaRepository {
  async create(entregaData) {
    const entrega = new Entrega(entregaData);
    await entrega.save();
    return entrega;
  }

  async findById(idEntrega) {
    return Entrega.findById(idEntrega);
  }

  async update(idEntrega, newData) {
    return Entrega.findByIdAndUpdate(idEntrega, newData, { new: true });
  }

  async findByUserId(userId) {
    try {
      const entregas = await Entrega.find({ idMontador: userId });
      return entregas;
    } catch (error) {
      throw new Error('Erro ao buscar histórico de entregas por userId');
    }
  }
}

module.exports = new EntregaRepository();

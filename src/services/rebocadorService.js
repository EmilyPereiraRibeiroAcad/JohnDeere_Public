const RebocadorRepository = require('../repositories/rebocadorRepository');

class RebocadorService {
  async registerRebocador(userId, nome, email, senha) {
    const rebocador = await RebocadorRepository.create({ userId, nome, email, senha });
    return rebocador;
  }

  async getRebocadorByUserId(userId) {
    return RebocadorRepository.findByUserId(userId);
  }

  async updateRebocador(userId, nome, email) {
    return RebocadorRepository.updateByUserId(userId, { nome, email });
  }

  async listPedidos(rebocadorId) {
    return RebocadorRepository.listPedidos(rebocadorId);
  }
}

module.exports = new RebocadorService();

const Pontuacao = require('../models/Pontuacao');

class PontuacaoRepository {
  async criarOuAtualizar(rebocadorId, data) {
    try {
      const pontuacao = await Pontuacao.findOneAndUpdate(
        { rebocadorId },
        data,
        { new: true, upsert: true } // Cria um novo documento se não existir
      );
      return pontuacao;
    } catch (error) {
      throw new Error('Erro ao criar ou atualizar pontuação: ' + error.message);
    }
  }

  async encontrarPorId(rebocadorId) {
    try {
      return await Pontuacao.findOne({ rebocadorId });
    } catch (error) {
      throw new Error('Erro ao buscar pontuação: ' + error.message);
    }
  }
}

module.exports = new PontuacaoRepository();

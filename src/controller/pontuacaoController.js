const PontuacaoService = require('../services/pontuacaoService.js');

class PontuacaoController {
  async calcular(req, res) {
    try {
      const { rebocadorId, quantidadeViagens, bonusTempo } = req.body;

      // Validação básica de dados
      if (!rebocadorId || typeof quantidadeViagens !== 'number' || typeof bonusTempo !== 'number') {
        return res.status(400).json({ error: 'Dados inválidos para cálculo de pontuação' });
      }

      const pontuacao = await PontuacaoService.calcularPontos(rebocadorId, quantidadeViagens, bonusTempo);
      return res.status(200).json(pontuacao);
    } catch (error) {
      console.error('Erro ao calcular pontuação:', error.message);
      return res.status(400).json({ error: error.message });
    }
  }

  async obter(req, res) {
    try {
      const { rebocadorId } = req.params;
      const pontuacao = await PontuacaoService.obterPontuacao(rebocadorId);
      return res.status(200).json(pontuacao);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}

// Exportar a instância da classe
module.exports = new PontuacaoController();

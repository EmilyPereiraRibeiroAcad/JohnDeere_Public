const PontuacaoRepository = require('../repositories/pontuacaoRepository');

class PontuacaoService {
  async calcularPontos(rebocadorId, quantidadeViagens, bonusTempo) {
    const VALOR_PONTO_VIAGEM = 10; // Exemplo de valor por viagem
    const VALOR_BONUS_TEMPO = 5; // Exemplo de valor por minuto de bônus

    // Cálculo de pontos
    const pontosViagens = quantidadeViagens * VALOR_PONTO_VIAGEM;
    const pontosBonusTempo = bonusTempo * VALOR_BONUS_TEMPO;
    const totalPontos = pontosViagens + pontosBonusTempo;

    // Atualiza ou cria a pontuação do rebocador
    const pontuacao = await PontuacaoRepository.criarOuAtualizar(rebocadorId, {
      quantidadeViagens,
      bonusTempo,
      totalPontos,
    });

    return pontuacao;
  }

  async obterPontuacao(rebocadorId) {
    const pontuacao = await PontuacaoRepository.encontrarPorId(rebocadorId);
    if (!pontuacao) throw new Error('Pontuação não encontrada');
    return pontuacao;
  }
}

module.exports = new PontuacaoService();

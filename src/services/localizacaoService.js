const Localizacao = require('../models/localizacao');
const { adicionarLocalizacao, obterLocalizacoes, getDistancias } = require('../repositories/localizacaoRepository');

// Serviço para processar e armazenar a localização
const processarLocalizacao = async (reqBody) => {
    // Os dados são recebidos diretamente sem formatação
    await adicionarLocalizacao(reqBody); // Chama a função do repositório com dados brutos
    return reqBody; // Retorna os dados recebidos
};

// Serviço para obter todas as localizações
const listarLocalizacoes = async () => {
    try {
        return await obterLocalizacoes(); // Chama o repositório para obter localizações
    } catch (error) {
        console.error("Erro ao listar localizações:", error);
        throw new Error('Erro ao listar localizações.');
    }
};

module.exports = {
    processarLocalizacao,
    listarLocalizacoes
};

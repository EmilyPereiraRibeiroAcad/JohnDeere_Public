const Localizacao = require('../models/localizacao');

// Função para adicionar uma nova localização ao banco de dados
const adicionarLocalizacao = async (localizacaoData) => {
    try {
        const novaLocalizacao = new Localizacao(localizacaoData);
        await novaLocalizacao.save();
        return novaLocalizacao; // Retorna a nova localização criada
    } catch (error) {
        console.error("Erro ao adicionar localização:", error);
        throw new Error('Erro ao adicionar localização.');
    }
};

// Função para obter todas as localizações
const obterLocalizacoes = async () => {
    try {
        const localizacoes = await Localizacao.find(); // Obtém todas as localizações
        return localizacoes;
    } catch (error) {
        console.error("Erro ao obter localizações:", error);
        throw new Error('Erro ao obter localizações.');
    }
};

module.exports = {
    adicionarLocalizacao,
    obterLocalizacoes};

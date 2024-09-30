const { processarLocalizacao} = require('../services/localizacaoService');
const { obterLocalizacoes } = require('../repositories/localizacaoRepository');

// Controlador para processar a localização recebida do ESP32
const processarLocalizacaoController = (req, res) => {
    try {
        const dadosRecebidos = processarLocalizacao(req.body);
        console.log('Dados recebidos:', dadosRecebidos); // Log para depuração
        return res.status(201).json(dadosRecebidos);
    } catch (error) {
        console.error("Erro ao processar localização:", error);
        return res.status(500).json({ message: 'Erro ao processar localização.' });
    }
};


// Controller para listar localizações
const listarLocalizacoes = async (req, res) => {
    try {
        const localizacoes = await obterLocalizacoes();
        return res.status(200).json(localizacoes);
    } catch (error) {
        console.error("Erro ao listar localizações:", error);
        return res.status(500).json({ message: 'Erro ao listar localizações.' });
    }
};

module.exports = {
    processarLocalizacaoController,
    listarLocalizacoes
};

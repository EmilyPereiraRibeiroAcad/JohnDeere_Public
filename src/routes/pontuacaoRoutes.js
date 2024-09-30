const express = require('express');
const PontuacaoController = require('../controller/pontuacaoController');

const router = express.Router();

// Rota para calcular pontos
router.post('/calcular', PontuacaoController.calcular);

// Rota para obter a pontuação
router.get('/:rebocadorId', PontuacaoController.obter);

module.exports = router;

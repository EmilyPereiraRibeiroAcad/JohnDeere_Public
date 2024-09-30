const express = require('express');
const router = express.Router();
const {
    processarLocalizacaoController,
    listarLocalizacoes,
} = require('../controller/localizacaoController');

router.post('/localizacaos', processarLocalizacaoController);
router.get('/localizacaos', listarLocalizacoes);

module.exports = router;

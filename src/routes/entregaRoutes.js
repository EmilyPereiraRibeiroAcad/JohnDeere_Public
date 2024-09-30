const express = require('express');
const entregaController = require('../controller/entregaController.js');

const router = express.Router();

router.post('/request', entregaController.requestEntrega);
router.get('/:id', entregaController.getEntregaById);
router.put('/:id', entregaController.updateEntrega);
router.get('/user/:userId', entregaController.getEntregasByUserId);

module.exports = router;

const express = require('express');
const pedidoController = require('../controller/pedidoController.js');

const router = express.Router();

router.post('/', pedidoController.createPedido);
router.get('/:id', pedidoController.getPedidoById);
router.get('/pedidos/montador/:montadorId', pedidoController.getByMontadorId);
router.put('/:id', pedidoController.updatePedido);

module.exports = router;

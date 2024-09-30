const express = require('express');
const rebocadorController = require('../controller/rebocadorController');

const router = express.Router();

router.post('/register', rebocadorController.register);
router.get('/profile/id', rebocadorController.profile);
router.put('/profile', rebocadorController.updateProfile);
router.get('/:id/pedidos', rebocadorController.listPedidos);

module.exports = router;

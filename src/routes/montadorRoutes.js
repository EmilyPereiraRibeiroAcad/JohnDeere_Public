const express = require('express');
const montadorController = require('../controller/montadorController');

const router = express.Router();

router.post('/register', montadorController.createMontador);
router.get('/montador/:montadorId', montadorController.getById);
router.put('/montador/:montadorId', montadorController.updateMontador);
router.delete('/montador/:montadorId', montadorController.deleteMontador);

module.exports = router;

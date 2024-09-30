const express = require('express');
const userController = require('../controller/userController.js');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.getAllProfiles);
router.get('/profile/:id', userController.getProfile);
router.put('/profile/:id', userController.updateProfile);

module.exports = router;

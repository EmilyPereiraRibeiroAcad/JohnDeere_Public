const userService = require('../services/userService.js');

const userController = {
  async register(req, res) {
    const { nome, email, senha, dataCriacao, statusConta, funcao } = req.body;

    try {
      const userData = {
        nome,
        email,
        senha,
        dataCriacao,
        statusConta,
        funcao,
      };

      const user = await userService.register(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req, res) {
    const { email, senha } = req.body;

    try {
      const user = await userService.findByEmail(email);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      if (senha === user.senha) {
        res.status(200).json({ user});
      } else {
        res.status(401).json({ message: 'Senha incorreta' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getProfile(req, res) {
    const userId = req.params.id;

    try {
      const user = await userService.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getAllProfiles(req, res) {
    try {
      const users = await userService.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateProfile(req, res) {
    const userId = req.params.id;
    const updateData = req.body;

    try {
      const updatedUser = await userService.update(userId, updateData);
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// Exportar o controlador
module.exports = userController;

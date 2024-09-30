const User = require('../models/User');

const userRepository = {
  async create(userData) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw new Error('Erro ao criar o usuário: ' + error.message);
    }
  },

  async findById(userId) {
    return User.findById(userId);
  },

  async findByEmail(email) {
    return User.findOne({ email });
  },

  async findAll() {
    return User.find();
  },

  async update(userId, updateData) {
    return User.findByIdAndUpdate(userId, updateData, { new: true });
  },

  async delete(userId) {
    return User.findByIdAndDelete(userId);
  }
};

module.exports = userRepository;

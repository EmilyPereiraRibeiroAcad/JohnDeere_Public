const userRepository = require('../repositories/userRepository');

const userService = {
  async register(userData) {
    return await userRepository.create(userData);
  },

  async findById(userId) {
    return userRepository.findById(userId);
  },

  async findAll() {
    return userRepository.findAll();
  },

  async findByEmail(email) {
    return userRepository.findByEmail(email);
  },

  async update(userId, updateData) {
    return userRepository.update(userId, updateData);
  },

  async delete(userId) {
    return userRepository.delete(userId);
  }
};

module.exports = userService;

const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_URI } = process.env;

mongoose.set('strictQuery', false);

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  }
}

module.exports = connectToDatabase;

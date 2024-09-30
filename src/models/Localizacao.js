const mongoose = require('mongoose');

const localizacaoSchema = new mongoose.Schema({
  ID: String,
  router1_ssid: String,
  router1_distancia: Number,
  router2_ssid: String,
  router2_distancia: Number,
  router3_ssid: String,
  router3_distancia: Number,
  status: String,
}, { timestamps: true }); // Adiciona campos de timestamps

const Localizacao = mongoose.model('Localizacao', localizacaoSchema);

module.exports = Localizacao;

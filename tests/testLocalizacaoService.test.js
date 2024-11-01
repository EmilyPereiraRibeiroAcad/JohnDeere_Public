// testLocalizacaoService.js
const request = require('supertest');
const app = require('./server');
const chai = require('chai');
const expect = chai.expect;

describe('Teste do Serviço de Localização', () => {
  it('POST /localizacaos - Deve salvar dados de localização e retornar mensagem de sucesso', async () => {
    const data = {
      ID: '123',
      router1_ssid: 'Router1',
      router1_distancia: 10,
      router2_ssid: 'Router2',
      router2_distancia: 15,
      router3_ssid: 'Router3',
      router3_distancia: 20,
      Status: 'Ativo',
    };
    const res = await request(app).post('/localizacaos').send(data);
    expect(res.status).to.equal(200);
    expect(res.text).to.equal('Dados recebidos e salvos com sucesso');
  });
});

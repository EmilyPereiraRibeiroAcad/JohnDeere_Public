const request = require('supertest');
const app = require('./server');
const chai = require('chai');
const expect = chai.expect;

describe('Teste do Serviço de Distância', () => {
  it('GET /distancias - Deve retornar uma lista de distâncias', async () => {
    const res = await request(app).get('/distancias');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(3); // Verifica se há 3 itens
  });
});

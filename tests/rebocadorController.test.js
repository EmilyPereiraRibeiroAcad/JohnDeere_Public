const request = require('supertest');
const app = require('../server'); 

describe('Testes para a API de Rebocadores', () => {
  it('Deve registrar um novo rebocador', async () => {
    const res = await request(app)
      .post('/rebocadores/register')
      .send({
        nome: 'Teste Rebocador',
        email: 'rebocador@example.com',
        senha: 'senha123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('vai obter o perfil do rebocador ', async () => {
  });

  it('vai atualizar esse rebocador autenticado', async () => {
  });
});

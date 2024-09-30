const request = require('supertest');
const app = require('../server'); 

describe('Testes para a API de Usuários', () => {
  it('Deve registrar um novo usuário', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({
        nome: 'Teste User',
        email: 'teste@example.com',
        senha: 'senha123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('Deve obter o perfil do usuário autenticado', async () => {
  });

  it('Deve atualizar o perfil do usuário autenticado', async () => {
  });
});

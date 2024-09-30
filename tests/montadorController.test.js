const request = require('supertest');
const app = require('../server'); 

//rodar com npm test

describe('Testes para a API de Montadores', () => {
  it('Deve registrar um novo montador', async () => {
    const res = await request(app)
      .post('/montadores/register')
      .send({
        nome: 'Teste Montador',
        email: 'montador@example.com',
        senha: 'senha123',
        
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    
  });

  it('perfil do montador autenticado', async () => {
    
  });

  it('atualizar o perfil do montador ', async () => {
  });
});

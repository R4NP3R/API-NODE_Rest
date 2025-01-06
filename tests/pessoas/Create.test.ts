import { StatusCodes } from 'http-status-codes'
import {testServer} from '../jest.setup'

describe('Pessoa - Create', () => {

  let accessToken = '';

  beforeAll(async () => {
    const email = 'testando@gmail.com'
    const senha = 'senha2025'
    await testServer.post('/cadastrar').send({
      nome: 'teste',
      email,
      senha
    })
    const signInRes = await testServer.post('/entrar').send({
      email, senha
    })
    accessToken = signInRes.body.accessToken
  })

  it('Criando Pessoa - Sem Autenticação', async () => {
    const res = await testServer
    .post('/pessoas')
    .send({
      nomeCompleto: 'Rafael',
      email: 'zecariba@12.com',
      cidadeId: 1,
    })

    expect(res.status).toBe(StatusCodes.UNAUTHORIZED)
    expect(res.body).toHaveProperty('errors.default')
  })

  it('Criando Pessoa - Maneira Correta', async () => {
    const res = await testServer
    .post('/pessoas')
    .set({authorization: `Bearer ${accessToken}`})
    .send({
      nomeCompleto: 'Rafael',
      email: 'zecariba@12.com',
      cidadeId: 1,
    })

    expect(res.status).toBe(StatusCodes.CREATED)
    expect(typeof res.body).toEqual('number')
  })
  
  it('Criando Pessoa - Sem o campo de nomeCompleto', async () => {
    const res = await testServer
    .post('/pessoas')
    .set({authorization: `Bearer ${accessToken}`})
    .send({
      email: 'zecariba12.com',
      cidadeId: 1,
    })

    expect(res.body).toHaveProperty('errors.body.nomeCompleto')
    expect(res.status).toBe(StatusCodes.BAD_REQUEST)
  })

  it('Criando Pessoa - Com o campo de email incorreto', async () => {
    const res = await testServer
    .post('/pessoas')
    .set({authorization: `Bearer ${accessToken}`})
    .send({
      nomeCompleto: 'Rafael',
      email: 'zecariba12.com',
      cidadeId: 1,
    })

    expect(res.body).toHaveProperty('errors.body.email')
    expect(res.status).toBe(StatusCodes.BAD_REQUEST)
  })

  it('Criando Pessoa - Sem o campo de email', async () => {
    const res = await testServer
    .post('/pessoas')
    .set({authorization: `Bearer ${accessToken}`})
    .send({
      nomeCompleto: 'Rafael',
      cidadeId: 1,
    })

    expect(res.body).toHaveProperty('errors.body.email')
    expect(res.status).toBe(StatusCodes.BAD_REQUEST)
  })

  
  it('Criando Pessoa - Sem o campo de Id da cidade', async () => {
    const res = await testServer
    .post('/pessoas')
    .set({authorization: `Bearer ${accessToken}`})
    .send({
      nomeCompleto: 'Rafael',
      email: 'zecariba12.com',
    })

    expect(res.body).toHaveProperty('errors.body.cidadeId')
    expect(res.status).toBe(StatusCodes.BAD_REQUEST)
  })


  it('Criando Pessoa - Com email já existente', async () => {
    const res = await testServer
    .post('/pessoas')
    .set({authorization: `Bearer ${accessToken}`})
    .send({
      nomeCompleto: 'Rafael',
      email: 'zecariba@12.com',
      cidadeId: 1,
    })

    const res2 = await testServer
    .post('/pessoas')
    .set({authorization: `Bearer ${accessToken}`})
    .send({
      nomeCompleto: 'Rafael',
      email: 'zecariba@12.com',
      cidadeId: 1,
    })

    expect(res2.body).toHaveProperty('errors.default')
    expect(res.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
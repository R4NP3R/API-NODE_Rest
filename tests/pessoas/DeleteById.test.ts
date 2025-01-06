import { StatusCodes } from 'http-status-codes'
import {testServer} from '../jest.setup'

describe('Pessoa - DeleteById', () => {

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

  it('Deletando Pessoa - Sem Autenticação', async () => {
    const res = await testServer.post('/pessoas')
    .set({authorization: `Bearer ${accessToken}`})
    .send({
      nomeCompleto: 'Rafael',
      email: 'ZecaRiba@gmail.com',
      cidadeId: 1,
    })

    expect(res.status).toBe(StatusCodes.CREATED)

    const res1 = await testServer.delete(`/pessoas/${res.body}`)
    .send()

    expect(res1.body).toHaveProperty('errors.default')
    expect(res1.status).toBe(StatusCodes.UNAUTHORIZED)
  })

  it('Deletando Pessoa - Maneira correta', async () => {
    const res = await testServer.post('/pessoas')
    .set({authorization: `Bearer ${accessToken}`})
    .send({
      nomeCompleto: 'Rafael',
      email: 'ZecaRiba@gmail.com',
      cidadeId: 1,
    })

    expect(res.status).toBe(StatusCodes.CREATED)

    const res1 = await testServer.delete(`/pessoas/${res.body}`)
    .set({authorization: `Bearer ${accessToken}`})
    .send()

    expect(res1.status).toBe(StatusCodes.NO_CONTENT)
    expect(res1.body).not
  })

  it('Tentando Deletar uma cidade sem ID na URL', async () => {

    const res1 = await testServer.delete('/pessoas/')
    .set({authorization: `Bearer ${accessToken}`})
    .send()

    expect(res1.status).toEqual(StatusCodes.NOT_FOUND)
  })
})
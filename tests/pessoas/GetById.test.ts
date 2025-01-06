import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Create - GetById', () => {
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

  it('Consultado pessoa pelo ID - Sem autenticação', async () => {

    const res1 = await testServer.post('/pessoas')
    .set({authorization: `Bearer ${accessToken}`})
    .send({
      nomeCompleto: 'Rafael',
      email: 'burtirico@gmail.com',
      cidadeId: 1
    })
    expect(res1.status).toEqual(StatusCodes.CREATED)

      const getPessoa = await testServer.get(`/pessoas/${res1.body}`)
      .send()

      expect(getPessoa.body).toHaveProperty('errors.default')
      expect(getPessoa.status).toBe(StatusCodes.UNAUTHORIZED)
  })

  it('Consultado pessoa pelo ID', async () => {

    const res1 = await testServer.post('/pessoas')
    .set({authorization: `Bearer ${accessToken}`})
    .send({
      nomeCompleto: 'Rafael',
      email: 'burtirico@gmail.com',
      cidadeId: 1
    })
    expect(res1.status).toEqual(StatusCodes.CREATED)

      const getPessoa = await testServer.get(`/pessoas/${res1.body}`)
      .set({authorization: `Bearer ${accessToken}`})
      .send()

      expect(getPessoa.body).toHaveProperty('nomeCompleto')
      expect(getPessoa.status).toBe(StatusCodes.OK)
  })
})
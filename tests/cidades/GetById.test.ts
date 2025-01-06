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

  it('Consultado cidade pelo ID - Sem autenticação', async () => {

    const res1 = await testServer.post('/cidades')
    .set({authorization: `Bearer ${accessToken}`})
    .send({ nome: 'Itapevi' })
    expect(res1.status).toEqual(StatusCodes.CREATED)

      const getCidade = await testServer
      .get(`/cidades/${res1.body}`)
      .send()
      
      expect(getCidade.body).toHaveProperty('errors.default')
      expect(getCidade.status).toBe(StatusCodes.UNAUTHORIZED)
  })

  it('Consultado cidade pelo ID', async () => {

    const res1 = await testServer.post('/cidades')
    .set({authorization: `Bearer ${accessToken}`})
    .send({ nome: 'Itapevi' })
    expect(res1.status).toEqual(StatusCodes.CREATED)

      const getCidade = await testServer
      .get(`/cidades/${res1.body}`)
      .set({authorization: `Bearer ${accessToken}`})
      .send()
      
      expect(getCidade.body).toHaveProperty('nome')
      expect(getCidade.status).toBe(StatusCodes.OK)
  })
})
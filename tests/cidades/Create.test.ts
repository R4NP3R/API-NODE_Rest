import { testServer } from "../jest.setup"
import { StatusCodes } from 'http-status-codes'

describe('Cidade - Create', () => {
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

  it('Cria Registro - Sem autenticação', async () => {

    const res1 = await testServer
    .post('/cidades')
    .send({
      nome: 'Itapevi'
    })


    expect(res1.body).toHaveProperty('errors.default')
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
  })

  it('Cria Registro', async () => {

    const res1 = await testServer
    .post('/cidades')
    .set({Authorization: `Bearer ${accessToken}`})
    .send({
      nome: 'Itapevi'
    })


    expect(typeof res1.body).toEqual('number')
    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
  })
  
  it('Erro de quantidade de caracteres', async () => {

    const res1 = await testServer
    .post('/cidades')
    .set({Authorization: `Bearer ${accessToken}`})
    .send({
      nome: 'It'
    })

    expect(res1.body).toHaveProperty('errors.body.nome')
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  })

  it('Erro de campo vazio', async () => {

    const res1 = await testServer
    .post('/cidades')
    .set({Authorization: `Bearer ${accessToken}`})
    .send({
    })

    expect(res1.body).toHaveProperty('errors.body.nome')
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  })
})


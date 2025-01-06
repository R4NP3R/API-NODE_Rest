import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidade - GetAll', () => {

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
  
  it('Consultando Cidades - Sem autenticação', async () => {

    const res1 = await testServer.post('/pessoas/')
    .set({authorization: `Bearer ${accessToken}`})
    .send({
      nomeCompleto: 'Rafael',
      email: 'burtirico@gmail.com',
      cidadeId: 1
    })

    expect(res1.status).toEqual(StatusCodes.CREATED)

    const res2 = await testServer.post('/pessoas/')
    .set({authorization: `Bearer ${accessToken}`})
    .send({
      nomeCompleto: 'Isaque',
      email: 'Lekson@gmail.com',
      cidadeId: 2
    })
    expect(res2.status).toEqual(StatusCodes.CREATED)

    const consultando = await testServer.get('/pessoas')
    .send()


    expect(consultando.body).toHaveProperty('errors.default')
    expect(consultando.status).toEqual(StatusCodes.UNAUTHORIZED)
  })


  it('Consultando Cidades', async () => {

    const res1 = await testServer.post('/pessoas/')
    .set({authorization: `Bearer ${accessToken}`})
    .send({
      nomeCompleto: 'Rafael',
      email: 'burtirico1@gmail.com',
      cidadeId: 1
    })

    expect(res1.status).toEqual(StatusCodes.CREATED)

    const res2 = await testServer.post('/pessoas/')
    .set({authorization: `Bearer ${accessToken}`})
    .send({
      nomeCompleto: 'Isaque',
      email: 'Lekson@gmail.com',
      cidadeId: 2
    })
    expect(res2.status).toEqual(StatusCodes.CREATED)

    const consultando = await testServer.get('/pessoas')
    .set({authorization: `Bearer ${accessToken}`})
    .send()

    expect(Number(consultando.header['x-total-count'])).toBeGreaterThan(0);
    expect(consultando.status).toEqual(StatusCodes.OK)
    expect(consultando.body.length).toBeGreaterThan(0)
  })
})
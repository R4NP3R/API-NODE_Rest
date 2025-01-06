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

    const res1 = await testServer.post('/cidades')
    .set({Authorization: `Bearer ${accessToken}`})
    .send({
      nome: 'Itapevi'
    })
        
    expect(res1.status).toEqual(StatusCodes.CREATED)

    const res2 = await testServer.post('/cidades')
    .set({Authorization: `Bearer ${accessToken}`})
    .send({
      nome: 'Barueri'
    })
    expect(res2.status).toEqual(StatusCodes.CREATED)



    const consultando = await testServer.get('/cidades')
    .send()


    expect(consultando.status).toEqual(StatusCodes.UNAUTHORIZED)
    expect(consultando.body).toHaveProperty('errors.default')
  })


  it('Consultando Cidades', async () => {

    const res1 = await testServer.post('/cidades')
    .set({Authorization: `Bearer ${accessToken}`})
    .send({
      nome: 'Itapevi'
    })
        
    expect(res1.status).toEqual(StatusCodes.CREATED)

    const res2 = await testServer.post('/cidades')
    .set({Authorization: `Bearer ${accessToken}`})
    .send({
      nome: 'Barueri'
    })
    expect(res2.status).toEqual(StatusCodes.CREATED)



    const consultando = await testServer.get('/cidades')
    .set({Authorization: `Bearer ${accessToken}`})
    .send()


    expect(consultando.status).toEqual(StatusCodes.OK)
    expect(Number(consultando.header['x-total-count'])).toBeGreaterThan(0);
    expect(consultando.body.length).toBeGreaterThan(0)
  })
})
import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidade - UpdateById', () => {

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

  it('Atualizando uma cidade - Sem autenticação', async () => {

    const res1 = await testServer.post('/pessoas')
    .set({authorization: `Bearer ${accessToken}`})
    .send({
      nomeCompleto: 'Rafael',
      email: 'burtirico@gmail.com',
      cidadeId: 1
    })
    expect(res1.status).toEqual(StatusCodes.CREATED)

    const updateName = await testServer.put(`/pessoas/${res1.body}`)
    .send({
      nomeCompleto: 'Isaque',
      email: 'bartolomeu@gmail.com',
      cidadeId: 4
    })

    expect(updateName.body).toHaveProperty('errors.default')
    expect(updateName.status).toEqual(StatusCodes.UNAUTHORIZED)

  })
  
  it('Atualizando uma cidade', async () => {

    const res1 = await testServer.post('/pessoas')
    .set({authorization: `Bearer ${accessToken}`})
    .send({
      nomeCompleto: 'Rafael',
      email: 'burtirico@gmail.com',
      cidadeId: 1
    })
    expect(res1.status).toEqual(StatusCodes.CREATED)

    const updateName = await testServer.put(`/pessoas/${res1.body}`)
    .set({authorization: `Bearer ${accessToken}`})
    .send({
      nomeCompleto: 'Isaque',
      email: 'bartolomeu@gmail.com',
      cidadeId: 4
    })
    expect(updateName.status).toEqual(StatusCodes.NO_CONTENT)

    const consultingName = await testServer.get(`/pessoas/${res1.body}`).set({authorization: `Bearer ${accessToken}`}).send()

    expect(consultingName.body).toEqual({
      id: 1,
      nomeCompleto: 'Isaque',
      email: 'bartolomeu@gmail.com',
      cidadeId: 4
    })
    expect(consultingName.status).toEqual(StatusCodes.OK)
  })

  it('Erro de quantidade de caracteres', async () => {

    const res1 = await testServer.put('/pessoas/1')
    .set({authorization: `Bearer ${accessToken}`})
    .send({
      nome: "ra"
    })

    expect(res1.body).toHaveProperty('errors.body.nomeCompleto')
  })

  it('Tentanto mudar o nome com o body vazio', async () => {

    const res1 = await testServer.put('/pessoas/1')
    .set({authorization: `Bearer ${accessToken}`})
    .send({
    })

    expect(res1.body).toHaveProperty('errors.body.nomeCompleto')
  })

  it('Tentando Atualizar uma cidade sem ID na URL', async () => {

    const res1 = await testServer.put('/pessoas')
    .set({authorization: `Bearer ${accessToken}`})
    .send()

    expect(res1.status).toEqual(StatusCodes.NOT_FOUND)
  })
})
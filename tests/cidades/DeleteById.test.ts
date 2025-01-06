import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidade - DeleteById', () => {
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

  it('Deletando uma cidade - Sem autenticação', async () => {
    const res1 = await testServer.post('/cidades/')
    .set({Authorization: `Bearer ${accessToken}`})
    .send({
      nome: 'Itapevi'
    })
    expect(res1.status).toEqual(StatusCodes.CREATED)


    const deletando = await testServer    
    .delete(`/cidades/${res1.body}`)
    
    expect(deletando.body).toHaveProperty('errors.default')
    expect(deletando.status).toEqual(StatusCodes.UNAUTHORIZED)
  })

  it('Deletando uma cidade', async () => {
    const res1 = await testServer.post('/cidades/')
    .set({Authorization: `Bearer ${accessToken}`})
    .send({
      nome: 'Itapevi'
    })
    expect(res1.status).toEqual(StatusCodes.CREATED)


    const deletando = await testServer    
    .delete(`/cidades/${res1.body}`).send()
    .set({Authorization: `Bearer ${accessToken}`})
    
    
    expect(deletando.status).toEqual(StatusCodes.NO_CONTENT)
  })

  it('Tentando Deletar uma cidade sem ID na URL', async () => {

    const res1 = await testServer
    .delete('/cidades/')
    .set({Authorization: `Bearer ${accessToken}`})

    expect(res1.status).toEqual(StatusCodes.NOT_FOUND)
  })
})
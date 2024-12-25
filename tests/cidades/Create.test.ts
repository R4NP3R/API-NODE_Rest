import { testServer } from "../jest.setup"
import { StatusCodes } from 'http-status-codes'

describe('Cidade - Create', () => {

  it('Cria Registro', async () => {

    const res1 = await testServer
    .post('/cidades')
    .send({
      nome: 'Itapevi'
    })


    expect(typeof res1.body).toEqual('number')
    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
  })
  
  it('Erro de quantidade de caracteres', async () => {

    const res1 = await testServer
    .post('/cidades')
    .send({
      nome: 'It'
    })

    expect(res1.body).toHaveProperty('errors.body.nome')
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  })

  it('Erro de campo vazio', async () => {

    const res1 = await testServer
    .post('/cidades')
    .send({
    })

    expect(res1.body).toHaveProperty('errors.body.nome')
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  })
})


import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"


describe('Usuario - SignIn', () => {
  beforeAll( async () => {
    const res = await testServer
    .post('/cadastrar')
    .send({
      nome: 'Rafael',
      email: 'zecariba@12.com',
      senha: 'banana'
    })
    expect(res.status).toBe(StatusCodes.CREATED)
  })
  it('Logando Usuario - Maneira Correta', async () => {
    const res1 = await testServer
    .post('/entrar')
    .send({
      email: 'zecariba@12.com',
      senha: 'banana'
    })

    expect(res1.status).toBe(StatusCodes.OK)
    expect(res1.body).toHaveProperty('acessToken')
  }) 
  it('Logando Usuario - Senha Errada', async () => {
    const res1 = await testServer
    .post('/entrar')
    .send({
      email: 'zecariba@12.com',
      senha: 'bana'
    })

    expect(res1.status).toBe(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.senha')
  }) 
  it('Logando Usuario - Email Errado', async () => {
    const res2 = await testServer
    .post('/entrar')
    .send({
      email: 'zecari@12.com',
      senha: 'banana'
    })

    expect(res2.status).toBe(StatusCodes.UNAUTHORIZED)
    expect(res2.body).toHaveProperty('errors.default')
  })
  it('Logando Usuario - Email com formato inválido', async () => {
    const res = await testServer
    .post('/entrar')
    .send({
      email: 'zecariba12.com',
      senha: 'banana'
    })

    expect(res.status).toBe(StatusCodes.BAD_REQUEST)
    expect(res.body).toHaveProperty('errors.body.email')
  })
  it('Logando Usuario - Email Não Informado', async () => {
    const res = await testServer
    .post('/entrar')
    .send({
      // email: 'zecari@12.com',
      senha: 'banana'
    })

    expect(res.status).toBe(StatusCodes.BAD_REQUEST)
    expect(res.body).toHaveProperty('errors.body.email')
  })
  it('Logando Usuario - Senha Não Informada', async () => {
    const res = await testServer
    .post('/entrar')
    .send({
      email: 'zecariba@12.com',
      // senha: 'banana'
    })

    expect(res.status).toBe(StatusCodes.BAD_REQUEST)
    expect(res.body).toHaveProperty('errors.body.senha')
  })      
})
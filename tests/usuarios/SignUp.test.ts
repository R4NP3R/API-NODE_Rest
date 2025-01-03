import { StatusCodes } from 'http-status-codes'
import {testServer} from '../jest.setup'

describe('Usuario - SignUp', () => {
  it('Criando Usuario - Maneira Correta', async () => {
    const res = await testServer
    .post('/cadastrar')
    .send({
      nome: 'Rafael',
      email: 'zecariba@12.com',
      senha: 'banana'
    })

    expect(typeof res.body).toEqual('number')
    expect(res.status).toBe(StatusCodes.CREATED)
  })  
  it('Criando Usuario - Com o campo de email incorreto', async () => {
    const res = await testServer
    .post('/cadastrar')
    .send({
      nome: 'Rafael',
      email: 'zecariba12.com',
      senha: 'banana'
    })

    expect(res.body).toHaveProperty('errors.body.email')
    expect(res.status).toBe(StatusCodes.BAD_REQUEST)
  })
  it('Criando Usuario - Sem o campo de email', async () => {
    const res = await testServer
    .post('/cadastrar')
    .send({
      nome: 'Rafael',
      senha: 'banana'
    })

    expect(res.body).toHaveProperty('errors.body.email')
    expect(res.status).toBe(StatusCodes.BAD_REQUEST)
  })
  it('Criando Usuario - Sem o campo de nome', async () => {
    const res = await testServer
    .post('/cadastrar')
    .send({
      email: 'zecariba12.com',
      cidadeId: 1,
    })

    expect(res.body).toHaveProperty('errors.body.nome')
    expect(res.status).toBe(StatusCodes.BAD_REQUEST)
  })  
  it('Criando Usuario - Sem o campo de senha', async () => {
    const res = await testServer
    .post('/cadastrar')
    .send({
      nome: 'Rafael',
      email: 'zecariba@12.com',
    })

    expect(res.body).toHaveProperty('errors.body.senha')
    expect(res.status).toBe(StatusCodes.BAD_REQUEST)
  })
  it('Criando Usuario - Com email já existente', async () => {
    const res = await testServer
    .post('/cadastrar')
    .send({
      nome: 'Rafael',
      email: 'zecaribaduplicado@12.com',
      senha: 'banana'
    })

    expect(res.status).toBe(StatusCodes.CREATED)

    const res2 = await testServer
    .post('/cadastrar')
    .send({
      nome: 'Rafael',
      email: 'zecaribaduplicado@12.com',
      senha: 'banana'
    })

    expect(res2.body).toHaveProperty('errors.default')
    expect(res2.status).toBe(StatusCodes.BAD_REQUEST)
  })
  it('Criando Usuario - Com o nome muito pequeno', async () => {
    const res = await testServer
    .post('/cadastrar')
    .send({
      nome: 'Ra',
      email: 'zecariba12.com',
      senha: 'banana'
    })

    expect(res.body).toHaveProperty('errors.body.email')
    expect(res.status).toBe(StatusCodes.BAD_REQUEST)
  })
  it('Criando Usuario - Com a senha muito pequeno', async () => {
    const res = await testServer
    .post('/cadastrar')
    .send({
      nome: 'Rafael',
      email: 'zecariba12.com',
      senha: 'ba'
    })

    expect(res.body).toHaveProperty('errors.body.email')
    expect(res.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
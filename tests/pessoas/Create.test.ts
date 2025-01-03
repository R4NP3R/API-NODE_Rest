import { StatusCodes } from 'http-status-codes'
import {testServer} from '../jest.setup'

describe('Pessoa - Create', () => {
  it('Criando Pessoa - Maneira Correta', async () => {
    const res = await testServer
    .post('/pessoas')
    .send({
      nomeCompleto: 'Rafael',
      email: 'zecariba@12.com',
      cidadeId: 1,
    })

    expect(typeof res.body).toEqual('number')
    expect(res.status).toBe(StatusCodes.CREATED)
  })
  
  it('Criando Pessoa - Sem o campo de nomeCompleto', async () => {
    const res = await testServer
    .post('/pessoas')
    .send({
      email: 'zecariba12.com',
      cidadeId: 1,
    })

    expect(res.body).toHaveProperty('errors.body.nomeCompleto')
    expect(res.status).toBe(StatusCodes.BAD_REQUEST)
  })

  it('Criando Pessoa - Com o campo de email incorreto', async () => {
    const res = await testServer
    .post('/pessoas')
    .send({
      nomeCompleto: 'Rafael',
      email: 'zecariba12.com',
      cidadeId: 1,
    })

    expect(res.body).toHaveProperty('errors.body.email')
    expect(res.status).toBe(StatusCodes.BAD_REQUEST)
  })

  it('Criando Pessoa - Sem o campo de email', async () => {
    const res = await testServer
    .post('/pessoas')
    .send({
      nomeCompleto: 'Rafael',
      cidadeId: 1,
    })

    expect(res.body).toHaveProperty('errors.body.email')
    expect(res.status).toBe(StatusCodes.BAD_REQUEST)
  })

  
  it('Criando Pessoa - Sem o campo de Id da cidade', async () => {
    const res = await testServer
    .post('/pessoas')
    .send({
      nomeCompleto: 'Rafael',
      email: 'zecariba12.com',
    })

    expect(res.body).toHaveProperty('errors.body.cidadeId')
    expect(res.status).toBe(StatusCodes.BAD_REQUEST)
  })


  it('Criando Pessoa - Com email já existente', async () => {
    const res = await testServer
    .post('/pessoas')
    .send({
      nomeCompleto: 'Rafael',
      email: 'zecariba@12.com',
      cidadeId: 1,
    })

    const res2 = await testServer
    .post('/pessoas')
    .send({
      nomeCompleto: 'Rafael',
      email: 'zecariba@12.com',
      cidadeId: 1,
    })

    expect(res2.body).toHaveProperty('errors.default')
    expect(res.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
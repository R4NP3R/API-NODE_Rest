import { StatusCodes } from 'http-status-codes'
import {testServer} from '../jest.setup'

describe('Pessoa - DeleteById', () => {
  it('Deletando Pessoa - maneira correta', async () => {
    const res = await testServer.post('/pessoas').send({
      nomeCompleto: 'Rafael',
      email: 'ZecaRiba@gmail.com',
      cidadeId: 1,
    })

    expect(res.status).toBe(StatusCodes.CREATED)

    const res1 = await testServer.delete(`/pessoas/${res.body}`)

    expect(res1.status).toBe(StatusCodes.NO_CONTENT)
    expect(res1.body).not
  })

  it('Tentando Deletar uma cidade sem ID na URL', async () => {

    const res1 = await testServer.delete('/pessoas/')

    expect(res1.status).toEqual(StatusCodes.NOT_FOUND)
  })
})
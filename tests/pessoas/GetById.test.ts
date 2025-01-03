import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Create - GetById', () => {
  it('Recebendo nome da cidade', async () => {

    const res1 = await testServer.post('/pessoas').send({
      nomeCompleto: 'Rafael',
      email: 'burtirico@gmail.com',
      cidadeId: 1
    })
    expect(res1.status).toEqual(StatusCodes.CREATED)

      const getPessoa = await testServer.get(`/pessoas/${res1.body}`)
      expect(getPessoa.body).toHaveProperty('nomeCompleto')
      expect(getPessoa.status).toBe(StatusCodes.OK)
  })
})
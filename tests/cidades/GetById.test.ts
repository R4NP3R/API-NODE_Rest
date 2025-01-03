import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Create - GetById', () => {
  it('Recebendo nome da cidade', async () => {

    const res1 = await testServer.post('/cidades').send({
      nome: 'Itapevi'
    })
    expect(res1.status).toEqual(StatusCodes.CREATED)

      const getCidade = await testServer.get(`/cidades/${res1.body}`)
      expect(getCidade.body).toHaveProperty('nome')
      expect(getCidade.status).toBe(StatusCodes.OK)
  })
})
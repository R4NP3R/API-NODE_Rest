import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Create - GetById', () => {
  it('Recebendo nome da cidade', async () => {

    const res1 = await testServer.post('/cidades').send({
      nome: 'Itapevi'
    })
    expect(res1.status).toEqual(StatusCodes.CREATED)

      const getCity = await testServer.get('/cidades/1')
      expect(getCity.body).toEqual({
        "id": 1,
        "nome": "Itapevi"
      })
      expect(getCity.status).toBe(StatusCodes.OK)
  })
})
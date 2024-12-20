import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Create - GetById', () => {
  it('Recebendo nome da cidade', async () => {

      const res1 = await testServer.get('/cidades/1')


      expect(res1.body).toBe('Em desenvolvimento')
      expect(res1.status).toBe(StatusCodes.OK)
  })
})
import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidade - GetAll', () => {
  
  it('Consultando Cidades', async () => {

    const res1 = await testServer.post('/cidades/').send({
          nome: 'Itapevi'
        })
    expect(res1.status).toEqual(StatusCodes.CREATED)
    const res2 = await testServer.post('/cidades/').send({
      nome: 'Barueri'
    })
    expect(res2.status).toEqual(StatusCodes.CREATED)

    const consultando = await testServer.get('/cidades')
    expect(Number(consultando.header['x-total-count'])).toBeGreaterThan(0);
    expect(consultando.status).toEqual(StatusCodes.OK)
    expect(consultando.body.length).toBeGreaterThan(0)
  })
})
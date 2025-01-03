import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidade - GetAll', () => {
  
  it('Consultando Cidades', async () => {

    const res1 = await testServer.post('/pessoas/').send({
          nomeCompleto: 'Rafael',
          email: 'burtirico@gmail.com',
          cidadeId: 1
        })

    expect(res1.status).toEqual(StatusCodes.CREATED)
    const res2 = await testServer.post('/pessoas/').send({
      nomeCompleto: 'Isaque',
      email: 'Lekson@gmail.com',
      cidadeId: 2
    })
    expect(res2.status).toEqual(StatusCodes.CREATED)

    const consultando = await testServer.get('/pessoas')
    expect(Number(consultando.header['x-total-count'])).toBeGreaterThan(0);
    expect(consultando.status).toEqual(StatusCodes.OK)
    expect(consultando.body.length).toBeGreaterThan(0)
  })
})
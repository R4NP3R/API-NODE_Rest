import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidade - DeleteById', () => {
  it('Deletando uma cidade', async () => {

    const res1 = await testServer.post('/cidades/').send({
      nome: 'Itapevi'
    })
    expect(res1.status).toEqual(StatusCodes.CREATED)

    const deletando = await testServer.delete(`/cidades/${res1.body}`).send()
    expect(deletando.status).toEqual(StatusCodes.NO_CONTENT)
  })

  it('Tentando Deletar uma cidade sem ID na URL', async () => {

    const res1 = await testServer.delete('/cidades/')

    expect(res1.status).toEqual(StatusCodes.NOT_FOUND)
  })
})
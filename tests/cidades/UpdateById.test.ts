import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidade - UpdateById', () => {
  
  it('Atualizando uma cidade', async () => {

    const res1 = await testServer.post('/cidades').send({
      nome: 'Balneário Camboriú'
    })
    expect(res1.status).toEqual(StatusCodes.CREATED)

    const updateName = await testServer.put(`/cidades/${res1.body}`).send({
      nome: 'Londrina'
    })
    expect(updateName.status).toEqual(StatusCodes.NO_CONTENT)

    const consultingName = await testServer.get(`/cidades/${res1.body}`)

    expect(consultingName.body).toEqual({
      "id": res1.body,
      "nome": 'Londrina'
    })
    expect(consultingName.status).toEqual(StatusCodes.OK)
  })

  it('Erro de quantidade de caracteres', async () => {

    const res1 = await testServer.put('/cidades/1').send({
      nome: "it"
    })

    expect(res1.body).toHaveProperty('errors.body.nome')
  })

  it('Tentanto mudar o nome com o body vazio', async () => {

    const res1 = await testServer.put('/cidades/1').send({
    })

    expect(res1.body).toHaveProperty('errors.body.nome')
  })

  it('Tentando Atualizar uma cidade sem ID na URL', async () => {

    const res1 = await testServer.delete('/cidades/')

    expect(res1.status).toEqual(StatusCodes.NOT_FOUND)
  })
})
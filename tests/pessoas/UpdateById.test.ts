import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidade - UpdateById', () => {
  
  it('Atualizando uma cidade', async () => {

    const res1 = await testServer.post('/pessoas').send({
      nomeCompleto: 'Rafael',
      email: 'burtirico@gmail.com',
      cidadeId: 1
    })
    expect(res1.status).toEqual(StatusCodes.CREATED)

    const updateName = await testServer.put(`/pessoas/${res1.body}`).send({
      nomeCompleto: 'Isaque',
      email: 'bartolomeu@gmail.com',
      cidadeId: 4
    })
    expect(updateName.status).toEqual(StatusCodes.NO_CONTENT)

    const consultingName = await testServer.get(`/pessoas/${res1.body}`)

    expect(consultingName.body).toEqual({
      id: 1,
      nomeCompleto: 'Isaque',
      email: 'bartolomeu@gmail.com',
      cidadeId: 4
    })
    expect(consultingName.status).toEqual(StatusCodes.OK)
  })

  it('Erro de quantidade de caracteres', async () => {

    const res1 = await testServer.put('/pessoas/1').send({
      nome: "ra"
    })

    expect(res1.body).toHaveProperty('errors.body.nomeCompleto')
  })

  it('Tentanto mudar o nome com o body vazio', async () => {

    const res1 = await testServer.put('/pessoas/1').send({
    })

    expect(res1.body).toHaveProperty('errors.body.nomeCompleto')
  })

  it('Tentando Atualizar uma cidade sem ID na URL', async () => {

    const res1 = await testServer.delete('/pessoas/')

    expect(res1.status).toEqual(StatusCodes.NOT_FOUND)
  })
})
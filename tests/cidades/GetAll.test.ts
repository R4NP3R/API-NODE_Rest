import { testServer } from "../jest.setup"

describe('Cidade - GetAll', () => {
  
  it('Consultando Cidades', async () => {

    const res1 = await testServer.get('/cidades')
    expect(res1.body).toBe('Em desenvolvimento')
  })
})
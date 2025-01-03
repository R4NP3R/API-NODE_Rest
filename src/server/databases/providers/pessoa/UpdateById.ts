import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IPessoa } from "../../models"



export const updateById = async (id: number, pessoa: Omit<IPessoa, 'id'>):Promise<void | Error> => {
  try {
    const [{count}] = await Knex(ETableNames.cidade)
    .select('*')
    .where('id', '=', pessoa.cidadeId)
    .count<[{count: number}]>('* as count')

    if (count === 0) {
      return new Error(`Não foi possivel encontrar uma cidade com o id ${pessoa.cidadeId}`)
    }

    const result = await Knex(ETableNames.pessoa).where('id', '=', id).update({
      nomeCompleto: pessoa.nomeCompleto,
      email: pessoa.email,
      cidadeId: pessoa.cidadeId
    })

    if (result > 0) return;

    return new Error(`Não foi possivel alterar os registros da pessoa com id: ${id}`)
  } catch (error) {
    console.log(error)
    new Error('Não foi possivel alterar os registros da pessoa')
  }
}
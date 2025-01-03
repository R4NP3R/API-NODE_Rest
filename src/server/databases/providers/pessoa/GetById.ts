import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IPessoa } from "../../models"

export const getById = async (id: number): Promise<IPessoa | Error> => {
  try {
    const result = await Knex(ETableNames.pessoa).select('*').where('id', '=', id).first()

  if (result) return result

  return new Error(`Não foi possivel encontrar uma pessoa com o id: ${id}`)
  } catch (error) {
    console.log(error)
    return  Error(`Não foi possivel consultar pessoa`)
  }
}
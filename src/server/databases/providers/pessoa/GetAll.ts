import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IPessoa } from "../../models"

export const getAll = async (filter: string, limit: number, page: number): Promise<IPessoa[] | Error> => {
  try {
    const result = await Knex.select('*')
    .from(ETableNames.pessoa)    
    .orWhere('nomeCompleto', 'like', `%${filter}%`)
    .offset((page - 1) * limit)
    .limit(limit)
    
    return result
  } catch (error) {
    console.log(error)
    return new Error('Não foi possivel consultar os registros de pessoas')
  }
}
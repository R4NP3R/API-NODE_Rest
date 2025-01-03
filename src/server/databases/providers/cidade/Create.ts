import { Knex } from "../../knex";
import { ICidades } from "../../models";
import { ETableNames } from "../../ETableNames";

export const create = async (cidades: Omit<ICidades, 'id'>): Promise<number | Error> => {
  try {    
    const [result] = await Knex(ETableNames.cidade).insert(cidades).returning('id')

    if (typeof result === 'object') {
      return result.id
    } else if (typeof result === 'number') {
      return result
    } else {
      return new Error('Erro ao cadastrar o registro')
    }    
  } catch (error) {
    console.log(error)
    return new Error('Erro ao cadastrar o registro no Banco de Dados')
  }
} 
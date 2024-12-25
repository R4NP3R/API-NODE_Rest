import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidades } from "../../models";


export const updateById = async (id:number, cidade: Omit<ICidades, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
    .update(cidade)
    .where('id', '=', id)
    
    if (result > 0) return;      
    
    return new Error('Não foi possivel alterar o nome da cidade')    
  } catch (error) {
    console.log(error)
    return new Error('Não foi possivel alterar o nome da cidade')
  }


}
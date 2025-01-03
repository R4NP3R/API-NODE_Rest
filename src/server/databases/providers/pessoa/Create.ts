import knex from "knex";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const Create = async (pessoa: IPessoa): Promise<number | Error> => {
  try {
    const [{count}] = await Knex(ETableNames.cidade)
    .select('*')
    .where('id', '=', pessoa.cidadeId)
    .count<[{count: number}]>('* as count')

    if (count === 0) {
      return new Error(`Não foi possivel encontrar uma cidade com o id ${pessoa.cidadeId}`)
    }

    const emailAreadyExists = await Knex(ETableNames.pessoa).select('email').where({email: pessoa.email}).first()

    if (emailAreadyExists) {
      return new Error(`Já existe uma pessoa cadastrada com o email: ${pessoa.email}`)
    }

    const [result] = await Knex(ETableNames.pessoa)
    .insert({
      nomeCompleto: pessoa.nomeCompleto,
      email: pessoa.email,
      cidadeId: pessoa.cidadeId
    })
    .returning('id')

    if (typeof result ===  'object') {
      return result.id
    } else if (typeof result === 'number') {
      return result
    } else {
      return new Error('Não foi possivel cadastrar pessoa')
    }
  } catch (error) {
    console.log(error)
    return new Error('Não foi possivel cadastrar pessoa Banco de Dados')
  }
}
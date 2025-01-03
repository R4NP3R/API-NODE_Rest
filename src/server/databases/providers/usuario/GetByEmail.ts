import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IUsuario } from "../../models"

export const GetByEmail = async (email: string): Promise<IUsuario | Error> => {
  try {
    const result = await Knex(ETableNames.usuario).select('*').where('email', '=', email).first()

  if (result) return result

  return new Error(`Não foi possivel encontrar uma pessoa com o email: ${email}`)
  } catch (error) {
    console.log(error)
    return  Error(`Não foi possivel consultar pessoa`)
  }
}
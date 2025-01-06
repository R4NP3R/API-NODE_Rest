import { PasswordCrypto } from "../../../shared/services"
import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { IUsuario } from "../../models"

export const Create = async (usuario: Omit<IUsuario, 'id'>): Promise<number | Error> => {
  try {
    const emailAreadyExists = await Knex(ETableNames.usuario).select('email').where({email: usuario.email}).first()

    if (emailAreadyExists) {
      return new Error(`Já existe um usuario cadastrado com o email: ${usuario.email}`)
    }

    const hashedPassword = await PasswordCrypto.hashPassword(usuario.senha)

    const [result] = await Knex(ETableNames.usuario).insert({
      nome: usuario.nome,
      email: usuario.email,
      senha: hashedPassword
    }).returning('id')

    
  
    if (typeof result === 'object') {
      return result.id
    } else if (typeof result === 'number') {
      return result
    }  else {
      return new Error('Não foi possivel cadastrar o usuário')
    }
  } catch (error) {
    console.log(error)
    return new Error('Não foi possivel cadastrar o usuário no Banco de Dados')
  }

} 
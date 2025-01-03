import { Request, Response } from "express"
import { UsuarioProvider } from "../../databases/providers/usuario"
import { IUsuario } from "../../databases/models"
import { validation } from "../../shared/middlewares/Validation"
import * as yup from 'yup'
import { StatusCodes } from "http-status-codes"


interface IBodyParams extends Omit<IUsuario, 'id' | 'nome'> {}


export const SignInValidation = validation((getSchema) => ({
  body: getSchema<IBodyParams>(yup.object().shape({
    email: yup.string().required().email().min(5),
    senha: yup.string().required().min(6)
  }))
}))




export const SignIn = async (req: Request<{}, {}, IBodyParams>, res: Response) => {
  const { email, senha} = req.body

  const result = await UsuarioProvider.GetByEmail(email)

  if(result instanceof Error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email e/ou senha inválidos'
      }
    })
    return;
  }

  if (result.senha !== senha) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email e/ou senha inválidos'
      }
    })
    return;
  } else {
    res.status(StatusCodes.OK).json({ acessToken: 'teste.teste.teste'})
  }


}
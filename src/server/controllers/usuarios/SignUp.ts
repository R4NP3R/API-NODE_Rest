import { Request, Response } from "express"
import { UsuarioProvider } from "../../databases/providers/usuario"
import { IUsuario } from "../../databases/models"
import { validation } from "../../shared/middlewares/Validation"
import * as yup from 'yup'
import { StatusCodes } from "http-status-codes"


interface IBodyParams extends Omit<IUsuario, 'id'> {}


export const SignUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyParams>(yup.object().shape({
    nome: yup.string().required().min(3),
    email: yup.string().required().email().min(5),
    senha: yup.string().required().min(6)
  }))
}))




export const SignUp = async (req: Request<{}, {}, IBodyParams>, res: Response) => {
  const result = await UsuarioProvider.Create(req.body)

  if(result instanceof Error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: result.message 
      }
    })
    return;
  }

  res.status(StatusCodes.CREATED).json(result)  
}
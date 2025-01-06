import { Request, Response } from "express"
import { UsuarioProvider } from "../../databases/providers/usuario"
import { IUsuario } from "../../databases/models"
import { validation } from "../../shared/middlewares/Validation"
import * as yup from 'yup'
import { StatusCodes } from "http-status-codes"
import { JWTService, PasswordCrypto } from "../../shared/services"


interface IBodyParams extends Omit<IUsuario, 'id' | 'nome'> {}


export const SignInValidation = validation((getSchema) => ({
  body: getSchema<IBodyParams>(yup.object().shape({
    email: yup.string().required().email().min(5),
    senha: yup.string().required().min(6)
  }))
}))




export const SignIn = async (req: Request<{}, {}, IBodyParams>, res: Response) => {
  const { email, senha} = req.body

  const usuario = await UsuarioProvider.GetByEmail(email)  
  
  if(usuario instanceof Error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email e/ou senha inválidos'
      }
    })
    return;
  }

  const passwordMatch = PasswordCrypto.verifyPassword(senha, usuario.senha)    
  
  if (!passwordMatch) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email e/ou senha inválidos'
      }
    })
    return;
  }

  const accessToken = JWTService.signIn({uid: usuario.id});

  if(accessToken === 'JWT_SECRET_NOT_FOUND') {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Não foi possivel gerar um token'
      }
    })
    
    return;
  }
  
  res.status(StatusCodes.OK).json({ accessToken })


}
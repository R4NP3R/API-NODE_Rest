import { Request, Response } from "express"
import { IPessoa } from "../../databases/models"
import * as yup from 'yup'
import { PessoaProviders } from "../../databases/providers/pessoa"
import { validation } from "../../shared/middlewares/Validation"
import { StatusCodes } from "http-status-codes"


interface IBodyProps extends Omit<IPessoa, 'id'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nomeCompleto: yup.string().required().min(3),
    email: yup.string().required().email(),
    cidadeId: yup.number().required().integer().min(1),
  })),
}));



export const Create = async (req: Request<{}, {}, IPessoa>, res: Response) => {
  const result = await PessoaProviders.Create(req.body)

  if (result instanceof Error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: result.message
      } 
    })
    return;
  }

  res.status(StatusCodes.CREATED).json(result);
}
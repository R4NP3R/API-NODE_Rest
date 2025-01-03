import { Request, Response } from "express"
import * as yup from 'yup'
import { PessoaProviders } from "../../databases/providers/pessoa"
import { validation } from "../../shared/middlewares/Validation"
import { StatusCodes } from "http-status-codes"


interface IParamProps {
  id?: number
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().required().moreThan(0),
  })),
}));



export const DeleteById = async (req: Request<IParamProps>, res: Response) => {  
  if (!req.params.id) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado'
      }
    })
    return;
  }

  const result = await PessoaProviders.deleteById(req.params.id)

  if (result instanceof Error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: result.message
      } 
    })
    return;
  }

  res.status(StatusCodes.NO_CONTENT).send()
}
import { Request, Response } from "express";
import { validation } from "../../shared/middlewares/Validation";
import * as yup from 'yup'
import { PessoaProviders } from "../../databases/providers/pessoa";
import { StatusCodes } from "http-status-codes";

interface IParamProps {
  id?: number
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
  }))
}))


export const getById = async (req: Request<IParamProps>, res: Response) => {
  if (!req.params.id) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado'
      }
    })
    return;
  }

  const result = await PessoaProviders.getById(req.params.id)

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })
    return;
  }

  res.status(StatusCodes.OK).json(result);
}
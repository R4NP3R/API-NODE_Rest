import { Request, Response } from "express";
import { IPessoa } from "../../databases/models";
import { validation } from "../../shared/middlewares/Validation";
import * as yup from 'yup'
import { PessoaProviders } from "../../databases/providers/pessoa";
import { StatusCodes } from "http-status-codes";

interface IPessoaBody extends Omit<IPessoa, 'id'> {}

interface IPessoaParam {
  id?: number
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IPessoaBody>(yup.object().shape({
    nomeCompleto: yup.string().required(),
    email: yup.string().required(),
    cidadeId: yup.number().required().moreThan(0),
  })),
  params: getSchema<IPessoaParam>(yup.object().shape({
    id: yup.number().integer().moreThan(0)
  }))
}))

export const updateById = async (req: Request<IPessoaParam, {}, IPessoaBody>, res: Response) => {
  if (!req.params.id) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O Parametro "id" é obrigatório'
      }
    })
    return;
  }

  const result = await PessoaProviders.updateById(req.params.id, req.body)

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })
    return;
  }

  res.status(StatusCodes.NO_CONTENT).send()
}
import { Request, Response } from "express"
import * as yup from 'yup'
import { PessoaProviders } from "../../databases/providers/pessoa"
import { StatusCodes } from "http-status-codes"
import { validation } from "../../shared/middlewares/Validation"


interface IQueryParams {
  filter?: string,
  page?: number,
  limit?: number
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryParams>(yup.object().shape({
    filter: yup.string().optional(),
    page: yup.number().optional().moreThan(0).default(1),
    limit: yup.number().optional().moreThan(0).default(10)
  }))
}));



export const getAll = async (req: Request<{}, {}, {}, IQueryParams>, res: Response) => {
  const result = await PessoaProviders.getAll(req.query.filter || '', req.query.limit || 10, req.query.page || 1,)
  const count = await PessoaProviders.count(req.query.filter)

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      } 
    })
    return;
  } else if (count instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: count.message
      } 
    })
    return;
  }

  res.setHeader('acess-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count)

  

  res.status(StatusCodes.OK).json(result)
}
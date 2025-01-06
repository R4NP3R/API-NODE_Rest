import { Request, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares/Validation";
import { CidadesProviders } from "../../databases/providers/cidade";
import { StatusCodes } from "http-status-codes";

interface IQueryProps {
  id?: number,
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation ((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    id: yup.number().optional().moreThan(0),
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional(),
  })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {  

  const result = await CidadesProviders.getAll(req.query.page || 1, req.query.limit || 10, req.query.filter || '', Number(req.query.id || 0))
  const count = await CidadesProviders.count(req.query.filter)

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })

    return;
  }

  if (count instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: count.message
      }
    })
    return;
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count)
  
  res.status(StatusCodes.OK).json(result)  
}

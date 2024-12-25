import { Request, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares/Validation";
import { ICidades } from "../../databases/models";
import { CidadesProviders } from "../../databases/providers/cidade";
import { StatusCodes } from "http-status-codes";

interface IParamProps{
  id?: number;
}

interface IBodyProps extends Omit<ICidades, 'id'> {}


export const updateByIdValidation = validation ((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().required().integer().moreThan(0),
  })),
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
  }))
}));



export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {  
  if (!req.params.id) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado'
      }
    })
    return;
  }


  const result = await CidadesProviders.updateById(req.params.id, {nome: req.body.nome})

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      erros: {
        default: result.message
      }
    })
    return;
  }
  
  res.status(StatusCodes.NO_CONTENT).json(result)
}

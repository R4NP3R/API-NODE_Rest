import { Request, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares/Validation";
import { StatusCodes } from "http-status-codes";
import { CidadesProviders } from "../../databases/providers/cidade";

interface IParamProps {
  id?: number;
}

export const deleteByIdValidation = validation ((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().required().integer().moreThan(0),
  })),
}));




export const DeleteById = async (req: Request<IParamProps>, res: Response) => {  
  if (!req.params.id) {
    res.send(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado'
      }
    })
    return;
  }

  const result = await CidadesProviders.deleteById(req.params.id) 
  
  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })
    return;
  }
  
  res.status(StatusCodes.NO_CONTENT).send();  
}

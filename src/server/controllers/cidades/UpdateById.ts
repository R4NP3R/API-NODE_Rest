import { Request, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares/Validation";
import { StatusCodes } from "http-status-codes";

interface IParamProps{
  id?: number;
}

interface IBodyProps {
  nome: string
}


export const updateByIdValidation = validation ((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().required().integer().moreThan(0),
  })),
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
  }))
}));



export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {  
  
  
  res.status(204).send();
}

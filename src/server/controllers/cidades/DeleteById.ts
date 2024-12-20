import { Request, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares/Validation";
import { StatusCodes } from "http-status-codes";

interface IParamProps {
  id?: number;
}

export const deleteByIdValidation = validation ((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().required().integer().moreThan(0),
  })),
}));




export const DeleteById = async (req: Request<IParamProps>, res: Response) => {   
  
  res.status(204).send();  
}

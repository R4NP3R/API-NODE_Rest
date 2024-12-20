import { Request, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares/Validation";
import { StatusCodes } from "http-status-codes";

interface IParamProps {
  id?: number;
}

export const getByIdValidation = validation ((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().moreThan(0),
  })),
}));




export const GetById = async (req: Request<IParamProps>, res: Response) => {  
  console.log(req.params)
  
  res.status(StatusCodes.OK).json('Em desenvolvimento');
}

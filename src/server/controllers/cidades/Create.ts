import { Request, RequestHandler, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares/Validation";
import { StatusCodes } from "http-status-codes";

interface ICidades {
  nome: string;
}

export const createValidation = validation ((getSchema) => ({
  body: getSchema<ICidades>(yup.object().shape({
    nome: yup.string().required().min(3),
  })),
}));



export const create = async (req: Request<{}, {}, ICidades>, res: Response) => {  
  
  res.status(StatusCodes.CREATED).json(1);
}


// export const createBodyValidator: RequestHandler = async (req: Request<{}, {}, ICidades>, res: Response, next) => {
//   try { 
//     await bodyValidation.validate(req.body, {abortEarly: false});
//     next();
//   } catch (err) {
//     const yupError = err as yup.ValidationError;
//     const errors:Record<string, string> = {};  
    
//     yupError.inner.forEach(error => {
//       if (!error.path) return;
//       errors[error.path] = error.message
//     });

//     res.status(StatusCodes.BAD_REQUEST).json({ errors });
//   }
// }
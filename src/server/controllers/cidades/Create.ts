import { Request, Response } from "express"
import * as yup from 'yup'
import { validation } from "../../shared/middlewares/Validation";
import { StatusCodes } from "http-status-codes";
import { ICidades } from "../../databases/models";
import { CidadesProviders } from "../../databases/providers/cidade";

interface IBodyProps extends Omit<ICidades, 'id'> {}

export const createValidation = validation ((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3).max(150),
  })),
}));



export const create = async (req: Request<{}, {}, ICidades>, res: Response) => {  
  const result = await CidadesProviders.create(req.body)

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }
  
  res.status(StatusCodes.CREATED).json(result);
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
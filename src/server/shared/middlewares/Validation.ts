import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from "yup";


type Tproprieties = 'body' | 'header' | 'params' | 'query'

type TGetSchema = <T> (Schema: Schema<T>) => Schema<T>

type TAllSchemas = Record<Tproprieties, Schema<any>>;

type TGetAllSChemas = (getSchema: TGetSchema) => Partial<TAllSchemas>

type TValidation = (getAllSChemas: TGetAllSChemas) => RequestHandler;


export const validation: TValidation = (getAllSChemas) => async (req, res, next) => {
  const schemas = getAllSChemas(schema => schema)

  const errorEntries: Record<string, Record<string, string>> = {};  

  Object.entries(schemas).forEach(([key, schema]) => {
    try { 
      schema.validateSync(req[key as Tproprieties], {abortEarly: false});
    } catch (err) {
      const yupError = err as ValidationError;
      const errors:Record<string, string> = {};  
      
      yupError.inner.forEach(error => {
        if (!error.path) return;
        errors[error.path] = error.message
      });
      
      errorEntries[key] = errors ;
    }    
  })

  if(Object.entries(errorEntries).length === 0) {
    next();
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ errors: errorEntries });
  }
}
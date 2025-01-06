import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTService } from "../services";

export const ensureAuthenticated:RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {default: 'Não Autenticado'}
    });
    return;
  }

  const [type, token] = authorization.split(' ')

  if(type !== 'Bearer') {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {default: 'Não Autenticado'}
    })
    return;
  }

  const jwtData = JWTService.verify(token);

  if(jwtData === 'JWT_SECRET_NOT_FOUND') {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {default: 'Erro ao verificar o token'}
    })
    return;
  } else if (jwtData === 'INVALID_TOKEN') {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {default: 'Não Autenticado'}
    })
    return;
  }

  req.headers.userId = jwtData.uid.toString()

  return next();
}
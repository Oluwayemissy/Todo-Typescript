import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../../helpers";
import { UserValidation, UserVerification } from "../validators/user";
import { NextFunction, Request, Response } from "express";
import UserService from '../services/user';

const { UNPROCESSABLE_ENTITY } = StatusCodes;

export async function validateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const valid = await UserValidation.validateAsync(req.body)
      req.body = valid
      return next();
    } catch (error: any) {
      return errorResponse({
        res,
        statusCode: UNPROCESSABLE_ENTITY,
        message: error.details[0].message,
        error: error.details[0].message,
      });
    }
}


export async function validateLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const valid = await UserVerification.validateAsync(req.body)
      req.body = valid
      return next();
    } catch (error: any) {
      return errorResponse({
        res,
        statusCode: UNPROCESSABLE_ENTITY,
        message: error.details[0].message,
        error: error.details[0].message,
      });
    }
}

export async function findUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const user = await UserService.findUser(email)
      if (user) throw new Error("user found")
      return next()
    } catch (error: any) {
      return errorResponse({
        res,
        statusCode: UNPROCESSABLE_ENTITY,
        message: error.message,
        error: error.message
      });
    }
}
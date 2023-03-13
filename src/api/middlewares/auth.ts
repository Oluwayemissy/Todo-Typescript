import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { RequestWithUser } from '../types';
import {
    errorResponse,
} from '../../helpers';
import { JWT_AUTH_SECRET } from '../../constants';
import { logger } from '../../config/logger';


const { UNPROCESSABLE_ENTITY, BAD_GATEWAY, UNAUTHORIZED } = StatusCodes;
const { UNAUTHORIZED: UNAUTHORIZED_MESSAGE, BAD_GATEWAY: BAD_GATEWAY_MESSAGE } =
    ReasonPhrases;


const checkAuthorizationToken = (authorization: string | undefined) => {
    let bearerToken = null;

    if (authorization) {
        const token = authorization.split(' ')[1];
        bearerToken = token || authorization;
    }

    return bearerToken;
};

const checkToken = (req: RequestWithUser) => {
    const {
        headers: { authorization }
    } = req;
    const bearerToken = checkAuthorizationToken(authorization);

    return req.body.refreshToken
        ? req.body.refreshToken
        : bearerToken ||
        req.headers['x-access-token'] ||
        req.headers.token ||
        req.body.token;
};

const verifyToken = (token: string, SECRET: string) => {
    return jwt.verify(token, SECRET);
};

export const isLoggedIn = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    const token = checkToken(req);
    if (!token) {
        return errorResponse({
            res,
            message: UNAUTHORIZED_MESSAGE,
            statusCode: UNAUTHORIZED,
        });
    }
    try {
        const user: any = verifyToken(token, JWT_AUTH_SECRET!);
        logger("info", 'authentication token decoded:::authenticate.auth.ts');

        req.user = user;

        next();
    } catch (error: any) {
        logger('error', `user authentication failed:::${error.message}`);
        return errorResponse({
            res,
            statusCode: UNPROCESSABLE_ENTITY,
            message: error.message,
            error: error.message,
        });
    }
}

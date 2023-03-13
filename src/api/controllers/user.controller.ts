import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pick } from 'lodash'
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/user'
import { successResponse, errorResponse } from '../../helpers';
import { Request, Response } from 'express';
import { logger } from '../../config/logger';
import { SALT_ROUNDS, AUTH_TOKEN_LIFETIME, JWT_AUTH_SECRET } from '../../constants';

const { CREATED, NOT_FOUND, OK, BAD_REQUEST, UNAUTHORIZED } = StatusCodes;


export default class UserController { 
    static async createUser(req: Request, res: Response) {
        try {
            const { body } = req;
            body.password =bcrypt.hashSync(body.password, SALT_ROUNDS);
            const user = UserService.createUser(body);
            // createUser(body);
            return successResponse({
                res,
                data: user,
                message: "user created",
                statusCode: CREATED
            })
            
        } catch (error) {
            logger('error', error);
            return errorResponse({
                res, 
                message: "error while creating user"
            })
        }
    }

    static async loginUser(req: Request, res: Response) {
        const { email, password} = req.body
        try {
            const user = await UserService.findUser(email)
            if(!user) {
                return errorResponse({
                    res, 
                    message: "Sorry, we couldn't find a user with those details.",
                    statusCode: NOT_FOUND
                })
            }
            const encryptedPassword = user.password;
            const isValid = bcrypt.compareSync(password, encryptedPassword);
            if (!isValid) {
              return errorResponse({
                res,
                message: 'Sorry, those credentials are incorrect.',
                statusCode: BAD_REQUEST,
              });
            }
            const userDetails = pick(
                user,
                'id',
                'username',
            );
            const token = jwt.sign({ ...userDetails }, String(JWT_AUTH_SECRET), {
                expiresIn: AUTH_TOKEN_LIFETIME,
            });
            return successResponse({
                res,
                data: {token, userDetails},
                message: 'Logged in successfully',
                statusCode: OK,
              });
           
        } catch (error: any) {
          logger('error', error?.message || error);
          return errorResponse({
            res,
            message: `We encountered a problem while processing your request. Please try again.`,
          });
        }
    }
}
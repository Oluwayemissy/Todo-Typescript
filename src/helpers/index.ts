import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
// import { IClassDocument } from '../api/model/classes/class.types';
import { ResponsePacket } from '../api/types'


/**
 * Handle api v1 route testing
 * @param res http response object
 */
 export function testRoute(_: any, res: Response) {
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Test API' });
}

/**
 * Handle all non defined route visits
 * @param res http response object
 */
export function invalidRoute(_: any, res: Response) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Route not exist' });
}

export function errorResponse ({ res, data, message, statusCode = 500}: ResponsePacket) {
    res.status(statusCode).json({message, ...(data && { data })})
}
  
export function successResponse ({ res, data, message, statusCode = 500}: ResponsePacket) {
    res.status(statusCode).json({message, ...(data && { data })})
};

export function toLower (str: string) {
    return str.toLowerCase();
}
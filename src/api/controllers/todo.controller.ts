import { StatusCodes } from "http-status-codes";
import TodoService from "../services/todo";
import { successResponse, errorResponse } from "../../helpers";
import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { RequestWithUser } from "../types";
import { Logger } from "winston";

const { CREATED, NOT_FOUND, OK, BAD_REQUEST, UNAUTHORIZED } = StatusCodes;

const { createTodo, getTodo, getTodos, updateTodo, deleteTodo } = TodoService

export default class TodoController {
    static async createTodo(req: Request, res: Response) {
        try {
            const { body } = req;
            const todo = TodoService.createTodo(body);
            return successResponse({
                res,
                data: todo,
                message: "todo created",
                statusCode: CREATED
            })
        } catch (error) {
            logger("error", error);
            return errorResponse({
                res,
                message: "error while creating todo",
            })
        }
    }

    static async getTodo(req: Request, res: Response) {
        try {
            const { todo_id } = req.params
            const todo = await getTodo(todo_id);
            if(!todo) {
                return errorResponse({
                    res,
                    message: "todo not found",
                    statusCode: NOT_FOUND
                })
            } 
            return successResponse({
                res, 
                data: todo,
                message: "todo fetched",
                statusCode: OK

            })
        } catch (error) {
          logger("error", error)
          errorResponse({
            res,
            message: "we encounted a problem while fetching a todo"
          })
            
        }
    }

    static async getTodos(req: Request, res: Response) {
        try {
            const todos = await getTodos()
            if(!todos) {
               return errorResponse({
                res,
                message: "todos not found",
                statusCode: NOT_FOUND
               })
            }
            return successResponse({
                res, 
                data: todos,
                message: "todos fetched",
                statusCode: OK

            })
        } catch (error) {
           logger("error", error)
           return errorResponse({
            res, 
            message: "we encoutered a problem while fetching classes"
           })
            
        }
    }

    static async updateTodo (req: Request, res: Response) {
        try {
            const { todo_id } = req.params;
            const todo = await getTodo(todo_id)
            if (!todo) {
                return errorResponse({
                    res,
                    message: "todo not found",
                    statusCode: NOT_FOUND
                })
            }
            // const body = req;
            await updateTodo(todo_id);
            return successResponse({
                res, 
                data: todo,
                message: "todo updated",
                statusCode: OK
            })
        } catch (error) {
           logger("error", error);
           return errorResponse({
              res,
              message: "error while updating todo",
           })
            
        }
    }
    
    static async deleteTodo(req: Request, res: Response) {
        try {
            const { todo_id } = req.params
            const todo = await TodoService.getTodo(todo_id);
            if (!todo) {
                return errorResponse({
                    res, 
                    message: "todo not found",
                    statusCode: NOT_FOUND
                })
            }
            await deleteTodo(todo_id);
            return successResponse({
                res,
                message: "todo deleted",
                statusCode: OK
            })
        } catch (error) {
           logger("error", error)
           return errorResponse({
              res,
              message: "we encoutered a problem while deleting todo"
           })
        }
    }

}
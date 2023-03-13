import { Router } from "express";
import { ROUTES } from "../../constants/index";
import TodoController from "../controllers/todo.controller";
import { validateTodo } from "../middlewares/todo";
import { isLoggedIn } from "../middlewares/auth";

const {
    CREATETODO,
    GETTODO,
    GETTODOS,
    UPDATETODO,
    DELETETODO
} = ROUTES

const {
    createTodo,
    getTodo,
    getTodos,
    updateTodo,
    deleteTodo
} = TodoController;

const todoRouter = Router()

todoRouter.get(
    GETTODO,
    getTodo
);

todoRouter.get(
    GETTODOS,
    getTodos
);

todoRouter.post(
    CREATETODO,
    isLoggedIn,
    validateTodo,
    createTodo
);

todoRouter.patch(
    UPDATETODO,
    updateTodo
);

todoRouter.delete(
    DELETETODO,
    deleteTodo
);

export default todoRouter
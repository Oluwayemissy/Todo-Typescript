import { Router } from "express";
import { ROUTES } from "../../constants/index";
import UserController from "../controllers/user.controller";
import { validateUser, findUser, validateLogin } from "../middlewares/user";
const {
    CREATEUSER,
    LOGIN
} = ROUTES

const { 
    createUser,
    loginUser
} = UserController;

const userRouter = Router()

userRouter.post(
    CREATEUSER,
    validateUser,
    findUser,
    createUser
  );
  
  userRouter.post(
    LOGIN,
    validateLogin,
    loginUser
  );
     
  export default userRouter
import { Router } from "express";
import { ROUTES } from "../../constants/index";
import UserController from "../controllers/user.controller";
import { validateUser, findUser, validateLogin } from "../middlewares/user";
const {
    CREATEUSER,
    LOGIN,
    GETUSERS
} = ROUTES

const { 
    createUser,
    loginUser,
    getUsers
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

userRouter.get(
  GETUSERS,
  getUsers
);
     
export default userRouter
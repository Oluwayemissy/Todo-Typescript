import { Router } from "express";
import { ROUTES } from "../../constants"
import { invalidRoute, testRoute } from "../../helpers";
import todoRouter from "./todo";
import userRouter from "./user";

const { WILD_CARD, HOME } = ROUTES;

// router for testing if api is live
const testRouter = Router()
testRouter.all(HOME, testRoute)

// Handle api for invalid routes
const invalidRouter = Router()
invalidRouter.all(WILD_CARD, invalidRoute)

const versionOneRouter = [
  testRouter,
  userRouter,
  todoRouter,
  invalidRouter,
]

export default versionOneRouter;
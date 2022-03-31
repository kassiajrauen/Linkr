import { Router } from "express";
import {
  createUser,
  loginUser,
  deleteSession,
} from "../crontrollers/usersController.js";
import { validateUsers, validateLogin } from "../middlewares/validateUsers.js";
// import { validateToken } from "../middlewares/validateToken.js";

const usersRouter = Router();
usersRouter.post("/sign-up", validateUsers, createUser);
usersRouter.post("/login", validateLogin, loginUser);
usersRouter.delete("/session/:id", deleteSession);

export default usersRouter;

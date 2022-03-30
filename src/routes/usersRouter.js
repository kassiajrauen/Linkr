import { Router } from "express";
import { createUser, loginUser } from "../crontrollers/usersController.js";
import { validateUsers, validateLogin } from "../middlewares/validateUsers.js";

const usersRouter = Router();
usersRouter.post("/sign-up", validateUsers, createUser);
usersRouter.post("/login", validateLogin, loginUser);

export default usersRouter;

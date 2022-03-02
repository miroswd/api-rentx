import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";

const usersRoutes = Router();

const createUserContoller = new CreateUserController();

usersRoutes.post("/", createUserContoller.handle);

export { usersRoutes };

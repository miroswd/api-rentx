import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/useCases/autenticateUser/AuthenticateUserController";

const authentitcateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authentitcateRoutes.post("/sessions", authenticateUserController.handle);

export { authentitcateRoutes };

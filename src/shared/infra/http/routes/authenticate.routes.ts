import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/autenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

const authentitcateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authentitcateRoutes.post("/sessions", authenticateUserController.handle);
authentitcateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authentitcateRoutes };

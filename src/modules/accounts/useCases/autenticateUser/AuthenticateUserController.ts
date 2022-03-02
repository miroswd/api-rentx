import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUseCase = container.resolve(AuthenticateUserUseCase);

    const authInfos = await authenticateUseCase.execute({ email, password });

    return response.status(201).json(authInfos);
  }
}

export { AuthenticateUserController };

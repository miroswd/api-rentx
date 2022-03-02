import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    // receber arquivo
    const avatarFile = request.file.filename;

    const updatedUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updatedUserAvatarUseCase.execute({ user_id: id, avatarFile });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };

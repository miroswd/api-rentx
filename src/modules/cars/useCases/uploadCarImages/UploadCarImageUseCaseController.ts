import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImageUseCase";

interface IFile {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFile[];
    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

    const images_name = images.map((file) => file.filename);

    uploadCarImageUseCase.execute({
      car_id: id,
      images_name,
    });

    return response.status(201).send();
  }
}

export { UploadCarImagesController };

import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  // constructor(private createCategoryUseCase: CreateCategoryUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase); // fazendo a injeção automática do usecase
    await createCategoryUseCase.execute({ name, description });
    return response.status(201).json({ success: true });
  }
}

export { CreateCategoryController };

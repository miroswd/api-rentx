import { inject, injectable } from "tsyringe";
// o service não deve conhecer o request, ele precisa só dos dados

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

/**
 * [x] - Definir o tipo de retorno
 * [x] - Alterar o retorno de erro
 * [x] - Acessar o repositorio
 */
@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository") // Será buscado no container qual classe é referenciada por esse nome
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    // const categoriesRepository = new CategoriesRepository();
    // responsável por fazer tudo oq o service precisa
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      //   return response.status(400).json({
      //     error: "Category already exists",
      //   });
      // }

      throw new Error("Category already exists"); // lançado pra quem fez a requisição
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };

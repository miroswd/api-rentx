import { parse as csvParse } from "csv-parse";
import { response } from "express";
import fs from "fs";

import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];
      const stream = fs.createReadStream(file.path); // leitura do arquivo em partes
      const parseFile = csvParse();

      /* 
    pega as informações e passa pra algum lugar 
    -> vai pegar o pedaço lido de file e repassar para o parseFile
    */
      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          resolve(categories);
        })
        .on("error", (error) => {
          reject(error);
        });
      // recebe as linhas lidas
    });
    // return categories; // o retorno não espera a finalização do parseFile.on, logo temos q transformar em uma promise
  }

  // ImportCategoryController - passando o mouse em cima de { file } ele exibe o tipo de file
  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map((category) => {
      const { name, description } = category;

      const existsCategory = this.categoriesRepository.findByName(name);

      if (!existsCategory) {
        this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }
}

export { ImportCategoryUseCase };

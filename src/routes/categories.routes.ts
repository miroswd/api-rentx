import { Router } from "express";
// import { v4 as uuidv4 } from "uuid";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists) {
    return response.status(400).json({
      error: "Category already exists",
    });
  }

  categoriesRepository.create({ name, description });

  return response.status(201).json({ success: true });
});

categoriesRoutes.get("/", (request, response) => {
  const allCategories = categoriesRepository.list();
  return response.status(200).json({ allCategories });
});

export { categoriesRoutes };

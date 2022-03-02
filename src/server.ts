import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { AppError } from "./errors/AppError";
import { router as routes } from "./routes";
import swaggerFile from "./swagger.json";
import "./database";
import "./shared/container";

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile)); // rota pra acessar a documentação
app.use(routes);

// tratativa de erro
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.status).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3333, () => {
  console.log({
    docs: `http://localhost:3333/api-docs`,
  });
  console.log("Server is running");
});

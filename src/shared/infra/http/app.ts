import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "@shared/container";
import upload from "@config/upload";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { AppError } from "@shared/errors/AppError";
import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { router as routes } from "./routes";

const app = express();
app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],

  tracesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use(Sentry.Handlers.errorHandler());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile)); // rota pra acessar a documentação

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`)); // quando tiver avatar não vai atrás da rota e sim da pasta
app.use("/cars", express.static(`${upload.tmpFolder}/cars`)); // quando tiver avatar não vai atrás da rota e sim da pasta

app.use(cors());
app.use(routes);

createConnection();
// tratativa de erro
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.status).json({
        message: err.message,
      });
    }
    console.error(err);
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };

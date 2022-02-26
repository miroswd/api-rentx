import express from "express";
import swaggerUi from "swagger-ui-express";

import { router as routes } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile)); // rota pra acessar a documentação
app.use(routes);

app.listen(3333, () => {
  console.log({
    docs: `http://localhost:3333/api-docs`,
  });
  console.log("Server is running");
});

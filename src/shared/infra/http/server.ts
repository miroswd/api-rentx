import { app } from "./app";

app.listen(3333, () => {
  console.log({
    docs: `http://localhost:3333/api-docs`,
  });
  console.log("Server is running");
});

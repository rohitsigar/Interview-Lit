import codeRouter from "./api/controllers/code/router";

export default function routes(app) {
  app.use("/code", codeRouter);
}

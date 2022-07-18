import codeRouter from "./api/controllers/code/router";
import linkRouter from "./api/controllers/Links/router";
import interviewRouter from "./api/controllers/Interview/router";

export default function routes(app) {
  app.use("/code", codeRouter);
  app.use("/links", linkRouter);
  app.use("/interview", interviewRouter);
}

import codeRouter from "./api/controllers/code/router";
import linkRouter from "./api/controllers/Links/router";
import interviewRouter from "./api/controllers/Interview/router";
import authRouter from "./api/controllers/auth/router";

export default function routes(app) {
  app.use("/code", codeRouter);
  app.use("/link", linkRouter);
  app.use("/interview", interviewRouter);
  app.use("/login", authRouter);
}

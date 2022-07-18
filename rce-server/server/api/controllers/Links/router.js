import * as express from "express";
import controller from "./controller";
import isLoggedIn from "../../middlewares/isLogged.handler";

export default express
  .Router()
  .post("/generate", isLoggedIn, controller.generateLink)
  .post("/delete", isLoggedIn, controller.deleteLink)
  .put("/addEmail", isLoggedIn, controller.addEmail)
  .put("/removeEmail", isLoggedIn, controller.removeEmail);

import CodeService from "../../services/code.service";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export class Controller {
  async execute(req, res) {
    try {
      const { code, input } = req.body;
      const { lang } = req.query;
      if (code && lang) {
        const output = await CodeService.execute(code, input, lang, uuidv4());
        if (output) {
          res.send({
            status: "200",
            message: "Code Successfully Executed",
            output: output.stdout,
            misc: output.stderr,
          });
        }
      } else {
        throw { message: "Invalid input" };
      }
    } catch (error) {
      res.send({
        status: error.status || "500",
        message: error.message || "Something Went Wrong",
      });
    }
  }
  async getcwd(req, res) {
    try {
      console.log(path.join(process.cwd(), "executor").replace(" ", "\\ "));
      console.log(__dirname);
      res.send({
        status: "200",
        message:
          "Current working directory is : " +
          path.join(process.cwd(), "executor").replace(" ", "\\ "),
      });
    } catch (error) {
      res.status(500).send({
        status: error.status || "500",
        message: error.message || "Something Went Wrong",
      });
    }
  }
}
export default new Controller();

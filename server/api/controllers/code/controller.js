// import ExamplesService from '../../services/examples.service';
import CodeService from "../../services/code.service";

export class Controller {
  async execute(req, res) {
    try {
      const output = await CodeService.execute(req.body.code, req.query.lang);
      if (output) {
        res.send({
          status: "200",
          message: "Code Successfully Executed",
          output,
        });
      }
    } catch (error) {
      res.send({
        status: error.status || "500",
        message: error.message || "Something Went Wrong",
      });
    }
  }
}
export default new Controller();

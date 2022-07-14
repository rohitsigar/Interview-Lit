import CodeService from '../../services/code.service';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export class Controller {
  async execute(req, res) {
    try {
      const { code, input, id } = req.body;
      const { lang } = req.query;
      if (code && lang) {
        const output = await CodeService.execute(code, input, lang, uuidv4());
        if (output) {
          res.send({
            status: '200',
            message: 'Code Successfully Executed',
            output
          });
        }
      } else {
        throw { message: 'Invalid Input' };
      }
    } catch (error) {
      res.send({
        status: error.status || '500',
        message: error.message || 'Something Went Wrong'
      });
    }
  }
  async getcwd(req, res) {
    try {
      res.send({
        status: '200',
        message:
          'Current working directory is : ' +
          path.join(process.cwd(), 'executor')
      });
    } catch (error) {
      res.send({
        status: error.status || '500',
        message: error.message || 'Something Went Wrong'
      });
    }
  }
}
export default new Controller();

import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
const LINK_SECRET_KEY = "abcde";
import Server from "../../../common/server";

export class Controller {
  async generateLink(req, res) {
    // const io = new Server().socketListen();
    // console.log(io);
    const { name } = req.body;
    const uid = uuidv4();
    console.log(uid);
    const token = jwt.sign({ name, uid }, LINK_SECRET_KEY);
    console.log(token);
  }
}

export default new Controller();

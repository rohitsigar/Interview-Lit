import Server from "../../../common/server";

export class Controller {
  async connect(req, res) {
    const uid = req.params.uid;
    console.log(uid);
  }
}

export default new Controller();

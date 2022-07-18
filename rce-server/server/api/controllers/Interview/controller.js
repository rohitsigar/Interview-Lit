import InterviewService from "../../services/interview.service";
const BASE_URI = process.env.BASE_URI;

export class Controller {
  async connect(req, res) {
    try {
      if (!req.user) {
        throw {
          message: "User must be logged in!!",
        };
      } else {
        const uid = req.params.uid;
        const link = `${BASE_URI}/interview/${uid}`;
        console.log(uid);
        output = await InterviewService.execute(link, user);
        if (output) {
          res.json({
            status: 200,
            message: "Connected to interview",
            output,
          });
        }
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

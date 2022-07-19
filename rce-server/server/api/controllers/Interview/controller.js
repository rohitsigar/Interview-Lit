import InterviewService from '../../services/interview.service';
const BASE_URI = process.env.BASE_URI;

export class Controller {
  async connect(req, res) {
    try {
      if (!req.user) {
        throw {
          message: 'User must be logged in!!'
        };
      } else {
        const uid = req.params.uid;
        const link = uid;
        console.log(uid);
        const output = await InterviewService.execute(link, req.user);
        if (output) {
          return res.send({
            status: 200,
            message: 'Connected to interview',
            output
          });
        }
      }
    } catch (error) {
      res.send({
        status: error.status || '500',
        message: error.message || 'Something Went Wrong'
      });
    }
  }
}

export default new Controller();

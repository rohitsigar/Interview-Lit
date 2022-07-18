import AuthService from '../../services/auth.service';

export class Controller {
  async execute(req, res) {
    try {
      const { email, name, dp } = req.body;
      if (!email || !name) {
        throw {
          message: 'Invalid login!!'
        };
      }
      const token = await AuthService.execute(email, name, dp);
      if (token) {
        // console.log(token);
        res.send({
          status: '200',
          message: 'Successfully logged in!!',
          token
        });
      } else {
        throw {
          message: 'Invalid login!! Try again!'
        };
      }
    } catch (error) {
      res.send({
        status: error.status || '500',
        message: error.message || 'Something Went Wrong'
      });
    }
  }

  async fetchUser(req, res) {
    try {
      const data = await AuthService.fetchUser(req.user._id);
      res.send({
        message: 'Fetched User Successfully',
        user: data
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

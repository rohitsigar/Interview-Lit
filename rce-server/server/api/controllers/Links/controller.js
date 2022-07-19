import LinkService from '../../services/link.service';

export class Controller {
  async generateLink(req, res) {
    try {
      // console.log(req.user);
      if (!req.user) {
        throw {
          message: 'User must be logged in!!'
        };
      } else {
        const link = await LinkService.generate(req.user);
        if (link) {
          // console.log(output);
          return res.json({
            status: 200,
            message: 'Successfully generated link!!',
            link
          });
        } else {
          throw {
            message: 'Some error occurred. Try again!!'
          };
        }
      }
    } catch (error) {
      res.send({
        status: error.status || '500',
        message: error.message || 'Something Went Wrong'
      });
    }
  }

  async deleteLink(req, res) {
    try {
      if (!req.user) {
        throw {
          message: 'User must be logged in!!'
        };
      } else {
        const { link } = req.body;
        const output = await LinkService.delete(link, req.user);
        // console.log(output);
        if (output) {
          return res.json({
            status: 200,
            message: 'Successfully ended interview!!'
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

  async addEmail(req, res) {
    try {
      if (!req.user) {
        throw {
          message: 'User must be logged in!!'
        };
      } else {
        const { link, email } = req.body;
        const output = await LinkService.add(link, email, req.user);
        if (output) {
          return res.json({
            status: 200,
            message: 'Email added successfully!!'
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

  async removeEmail(req, res) {
    try {
      if (!req.user) {
        throw {
          message: 'User must be logged in!!'
        };
      } else {
        const { link, email } = req.body;
        const output = await LinkService.remove(link, email, req.user);
        if (output) {
          return res.json({
            status: 200,
            message: 'Email removed successfully!!'
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

  async fetchHostedMeetingLinks(req, res) {
    try {
      if (!req.user) {
        throw {
          message: 'User must be logged in!!'
        };
      } else {
        const links = await LinkService.fetchHostLinks(req.user);
        if (links) {
          return res.json({
            status: 200,
            message: 'Fetched links successfully',
            links
          });
        }
      }
    } catch (error) {
      res.send({
        status: error.status || '500',
        message: error.message || 'Something went wrong'
      });
    }
  }

  async fetchInterviewee(req, res) {
    try {
      if (!req.user) {
        throw {
          message: 'User must be logged in!!'
        };
      } else {
        const { link } = req.query;
        const interviewee = await LinkService.fetchInterviewee(link, req.user);

        return res.json({
          status: 200,
          message: 'Fetched links successfully',
          interviewee
        });
      }
    } catch (err) {
      res.send({
        status: err.status || '500',
        message: err.message || 'Something went wrong'
      });
    }
  }

  async checkAccess(req, res) {
    try {
      if (!req.user) {
        throw {
          message: 'User must be logged in!!'
        };
      } else {
        const { link } = req.query;
        const access = await LinkService.checkAccess(link, req.user);
        if (access) {
          res.send({
            status: 200,
            message: 'Valid Access',
            access
          });
        } else {
          res.send({
            status: 200,
            message: 'Invalid Access',
            access
          });
        }
      }
    } catch (err) {
      res.send({
        status: err.status || '500',
        message: err.message || 'Something went wrong'
      });
    }
  }
}

export default new Controller();

import mongoose from 'mongoose';
const Link = require('../../models/link');

class InterviewService {
  async execute(link, user) {
    try {
      const isLink = await Link.findOne({ link })
        .populate('interviewer')
        .populate('interviewee');
      console.log(user._id.toString());
      console.log(isLink.interviewer._id.toString());
      if (isLink) {
        if (user._id.toString() == isLink.interviewer._id.toString()) {
          return isLink;
        } else {
          throw {
            message: 'You are not admin of this link'
          };
        }
      } else {
        throw {
          status: 404,
          message: 'Invalid link'
        };
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new InterviewService();

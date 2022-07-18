import mongoose from "mongoose";
const Link = require("../../models/link");

class InterviewService {
  async execute(link, user) {
    try {
      const isLink = await Link.findOne({ link })
        .populate("interviewer")
        .populate("interviewee");
      if (isLink) {
        if (user._id.toString() == isLink.interviewer.toString()) {
          return isLink;
        } else {
        }
      } else {
        throw {
          status: 404,
          message: "Invalid link",
        };
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new InterviewService();

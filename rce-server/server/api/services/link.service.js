import mongoose from "mongoose";
import crypto from "crypto";
const Link = require("../../models/link");
const BASE_URI = process.env.BASE_URI;

class LinkService {
  async generate(user) {
    try {
      const uid = crypto.randomBytes(16).toString("hex");
      const link = `${BASE_URI}/interview/${uid}`;

      const generatedLink = await Link.create({
        link,
        interviewer: user._id,
      });

      if (generatedLink) return generatedLink.link;
    } catch (error) {
      throw error;
    }
  }

  async delete(link, user) {
    try {
      const isLink = await Link.findOne({ link });
      if (isLink) {
        if (user._id.toString() == isLink.interviewer.toString()) {
          const deleted = await Link.deleteOne({ link });
          if (deleted.ok) return true;
        } else {
          throw {
            message: "Only interviewer can end the interview!!",
          };
        }
      } else {
        throw {
          message: "Link not found!",
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async add(link, email, user) {
    try {
      const isLink = await Link.findOne({ link });
      if (isLink) {
        if (user._id.toString() == isLink.interviewer.toString()) {
          const data = await Link.updateOne(
            { link },
            { $push: { email } },
            { new: true }
          );
          if (data.ok) {
            return true;
          }
        } else {
          throw {
            message: "Only interviewer can add emails!!",
          };
        }
      } else {
        throw {
          message: "Link not found!",
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async remove(link, email, user) {
    try {
      const isLink = await Link.findOne({ link });
      if (isLink) {
        if (user._id.toString() == isLink.interviewer.toString()) {
          const data = await Link.updateOne(
            { link },
            { $pull: { email } },
            { new: true }
          );
          if (data.ok) {
            return true;
          }
        } else {
          throw {
            message: "Only interviewer can remove emails!!",
          };
        }
      } else {
        throw {
          message: "Link not found!",
        };
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new LinkService();

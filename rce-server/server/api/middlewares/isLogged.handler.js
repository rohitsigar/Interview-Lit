import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../../models/user";
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw {
        status: 401,
        message: "User must be logged in!!",
      };
    }
    // const token = token.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err)
        throw {
          status: 401,
          message: "User must be logged in!!",
        };
      const { _id } = payload;
      User.findById(_id).then((userData) => {
        req.user = userData;
        next();
      });
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      status: error.status || "500",
      message: error.message || "Something Went Wrong",
    });
  }
};

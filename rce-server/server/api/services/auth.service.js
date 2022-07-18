import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const User = require("../../models/user");
const JWT_SECRET = process.env.JWT_SECRET;

class AuthService {
  async execute(email, name, dp) {
    try {
      let setUser = "";
      const user = await User.findOne({ email });
      if (!user) {
        const newUser = await User.create({
          email,
          name,
          dp,
        });
        if (newUser) {
          setUser = newUser;
        }
      } else {
        setUser = user;
      }
      const token = jwt.sign(
        { _id: setUser._id, email: setUser.email },
        JWT_SECRET
      );
      return token;
    } catch (err) {
      res.send({
        status: error.status || "500",
        message: error.message || "Something Went Wrong",
      });
    }
  }
}

export default new AuthService();

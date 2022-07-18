const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const linkSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      unique: true,
      required: true,
    },
    interviewer: {
      type: ObjectId,
      ref: "User",
    },
    email: [
      {
        type: String,
      },
    ],
    interviewee: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Link", linkSchema);

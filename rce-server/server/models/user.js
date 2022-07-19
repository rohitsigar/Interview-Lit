const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dp: {
      type: String,
      // default: "https://www.k2e.com/wp-content/uploads/2018/09/person-icon.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

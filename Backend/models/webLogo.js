const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = mongoose.Schema(
  {
    webLogo: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);



const Logo = mongoose.model("logo", UserSchema);
module.exports = Logo;

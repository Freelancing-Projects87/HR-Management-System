const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your name"],
    },
    surname: {
      type: String,
      required: [true, "Please add your surname"],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please insert valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please insert your Password"],
      minLength: [6, "Password must be upto 6 characters "],
      maxLength: [256, "Password must not exceeds above 30 characters"],
    },
    photo: {
      type: String,
      required: [true, "Please add your Profile Image"],
      default: "https://i.ibb.co/x3qsfx1/Image.png",
    },
    phone: {
      type: String,
      default: "+4910000000000",
    },
    bio: {
      type: String,
      default: "bio",
      maxLength: [250, "Bio must not be more than 250 characters"],
    },
    role:{type:String,required:true}
  },
  {
    timestamps: true,
  }
);

////encrypted Password before creating new user////
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(9);
  hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("user", UserSchema);
module.exports = User;

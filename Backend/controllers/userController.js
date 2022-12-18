const asyncHandler = require("express-async-handler"); ///for not using trycatch block////
const User = require("../models/UserModel");
////User Routes/////
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, photo, phone, bio } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please insert all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be upto 6 letter characters ");
  }
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    res.status(400);
    throw new Error("Email Address Already Exists, Please insert new one");
  }

  //   create new user
  const user = await User.create({
    name,
    email,
    password,
    photo,
    phone,
    bio,
  });
  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(201).send({
      message: "user Created Successfully!",
      data: {
        _id,
        name,
        email,
        photo,
        phone,
        bio,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

/////Login User controller/////////
// const LoginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     res.status(400);
//     throw new Error("email and password can't be empty");
//   }
//   const isUserExis = User.findOne({ email });
// });

module.exports = {
  registerUser,
};

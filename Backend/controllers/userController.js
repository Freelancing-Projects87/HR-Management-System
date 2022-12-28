const asyncHandler = require("express-async-handler"); ///for not using trycatch block////
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Token = require("../models/tokenModel");
const sendEmail = require("../utils/sendEmail");
////User Routes/////

////JWT SignIn/////
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRECT, { expiresIn: "1d" });
};

////RegisterUser Route controller/////////
const registerUser = asyncHandler(async (req, res) => {
  const { name, email,surname, password, photo, phone, bio } = req.body;
  if (!name || !email || !password || !surname) {
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
    surname
  });

  /////Generate Token/////
  const token = generateToken(user._id);

  ////send HTTP-Only cookie///
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), ///1day
    sameSite: "none",
    secure: true,
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
        token,
        surname
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
})

///Login User controller/////////
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("email and password can't be empty");
  }
  const user = await User.findOne({ email });

  //// User doesn't exist///
  if (!user) {
    res.status(400);
    throw new Error("User doesn't exist, Please Sign Up");
  }

  /// user exists/////
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  /////Generate Token/////
  const token = generateToken(user._id);

  ////send HTTP-Only cookie///
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), ///1day
    sameSite: "none",
    secure: true,
  });

  if (user && isPasswordCorrect) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(200).json({
      message: "user LoggedIn Successfully!",
      data: {
        _id,
        name,
        email,
        photo,
        phone,
        bio,
        token,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

//// logout User////
const logoutUser = asyncHandler(async (req, res) => {
  ////send HTTP-Only cookie///
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), ///1day
    sameSite: "none",
    secure: true,
  });
  return res.status(200).send({
    message: "Successfully logged Out!",
    data: {},
  });
});

///// get User Info/////
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(200).json({
      message: "user Data Fetched Successfully!",
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
    throw new Error("User Not Found !");
  }
});

///login status /login/logout?//////
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  ////verified jwt token///
  const verified = jwt.verify(token, process.env.JWT_SECRECT);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

/////Update User Profile /////
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { name, email, photo, phone, bio } = user;
    user.email = email;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;
    user.photo = req.body.photo || photo;
    const updatedUser = await user.save();
    res.status(200).json({
      message: "User Record Updated Successfully",
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
        photo: updatedUser.photo,
      },
    });
  } else {
    res.status(404);
    throw new Error("user not Found");
  }
});

////////changing old password into new///
const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { oldPassword, password } = req.body;
  if (!user) {
    res.status(404);
    throw new Error("User not found, please signup!");
  }
  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("password fields can't be empty");
  }
  ///getting and comparing old password of user/////
  const compareOldPasswordPassword = await bcrypt.compare(
    oldPassword,
    user.password
  );

  if (user && compareOldPasswordPassword) {
    user.password = password;
    await user.save();
    res.status(200).json({
      message: "Password changed Successfully",
      data: [],
    });
  } else {
    res.status(400);
    throw new Error("Old Password doesn't match");
  }
});

////forgot the password router/////
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  /// CHECK IF EMAIL EXISTS IN DATABASE////
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User doesn't exist!");
  }

  ////delete token if it exists in database///
  let isTokenExist = await Token.findOne({ userId: user._id });
  if (isTokenExist) {
    await isTokenExist.deleteOne();
  }
  ///create reset token///
  let createResetToken = crypto.randomBytes(32).toString("hex") + user._id;

  ///hashedToken////
  let hashedToken = crypto
    .createHash("sha256")
    .update(createResetToken)
    .digest("hex");
  /////Now save the token into database///
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), //// 30 minutes expiry time
  }).save();

  ///construct Reset URL///
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${createResetToken}`;

  ///Reset an Email/////
  const message = `<h2>Hello ${user.name}</h2>
  <p>Please use the url below to reset your password</p>
  <p>This reset link is only valid for 30 minutes</P>
  <a href=${resetUrl} clicktracking=off>${resetUrl} </a>
  <p> Regards,</p>
  <p>Fida Hussain</p>
  `;

  const subject = "Password Reset Request";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;
  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({
      message: "Resent Email Sent Successfully!",
      success: true,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

////reset password router////
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  ///hashedToken and then compare with stored token into db ////
  let hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const isTokenExist = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });
  if (!isTokenExist) {
    res.status(404);
    throw new Error("Invalid or expired token");
  }
  ///Find the user with id stored into token model///
  const user = await User.findOne({ _id: isTokenExist.userId });
  user.password = password;
  await user.save();
  res.status(200).json({ message: "Password reset Successfully!", data: {} });
});
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
};

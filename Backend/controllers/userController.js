const asyncHandler = require("express-async-handler"); ///for not using trycatch block////
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
////User Routes/////

////JWT SignIn/////
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRECT, { expiresIn: "1d" });
};

////RegisterUser Route controller/////////
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
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

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
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
};

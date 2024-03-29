const asyncHandler = require("express-async-handler"); ///for not using trycatch block////
const User = require("../models/UserModel");
const WebLogo = require("../models/webLogo");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Token = require("../models/tokenModel");
var mongodb = require("mongodb");

const sendEmail = require("../utils/sendEmail");
////User Routes/////

////JWT SignIn/////
const generateToken = id => {
  return jwt.sign({id}, process.env.JWT_SECRECT, {expiresIn: "1d"});
};

////RegisterUser Route controller/////////
const registerUser = asyncHandler(async (req, res) => {
  const {name, email, surname, password, photo, phone, bio, role} = req.body;
  console.log(req.body, "asd");
  let userRole;
  if (email == "admin@gmail.com") {
    userRole = "admin";
  } else {
    userRole = role;
  }
  if (!name || !email || !password || !surname) {
    res.status(400).json({message: "Please insert all required fields"});
    // throw new Error("Please insert all required fields");
  }
  if (password.length < 6) {
    res
      .status(400)
      .json({message: "Password must be upto 6 letter characters "});
    // throw new Error("Password must be upto 6 letter characters ");
  }
  const isUserExist = await User.findOne({email});
  if (isUserExist) {
    res.status(400).json("Email Address Already Exists, Please insert new one");
    // throw new Error("Email Address Already Exists, Please insert new one");
  }

  //   create new user
  const user = await User.create({
    name,
    email,
    password,
    photo,
    phone,
    bio,
    surname,
    role: userRole,
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
    const {_id, name, email, photo, phone, bio, role} = user;
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
        surname,
        role,
      },
    });
  } else {
    res.status(400).json({message: "Invalid User Data"});
    // throw new Error("Invalid User Data");
  }
});

///Login User controller/////////
const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  console.log(req.body, "lo");
  if (!email || !password) {
    res.status(400);
    // throw new Error("email and password can't be empty");
  }
  const user = await User.findOne({email});

  //// User doesn't exist///
  if (!user) {
    res.status(400);
    // throw new Error("User doesn't exist, Please Sign Up");
  }

  /// user exists/////
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  /////Generate Token/////
  const token = generateToken(user._id);

  ////send HTTP-Only cookie///
  res.cookie("access_token", token, {
    // path: "/",
    httpOnly: true,
    // expires: new Date(Date.now() + 1000 * 86400), ///1day
    sameSite: "none",
    // secure: true,
  });

  if (user && isPasswordCorrect) {
    const {_id, name, email, photo, phone, bio, role} = user;
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
        role,
      },
    });
  } else {
    res.status(400).json({message: "Invalid Email or Password"});
    // throw new Error("Invalid Email or Password");
  }
});
///Token controller for user/////////
const storetokenData = asyncHandler(async (req, res) => {
  console.log(req.body, "ko");
  var date = new Date();
  try {
    if (!req.body.token) {
      res.status(400);
      throw new Error("user data is required");
    }
    const tokenData = await new Token({
      userId: req.body._id,
      token: req.body.token,
      createdAt: Date.now(),
      expiresAt: date.setDate(date.getDate() + 1), //// 1 expiry time
    }).save();
    console.log(tokenData, "tokenData");
    if (tokenData) {
      res.status(200).json({
        message: "token data added sucessfully!",
        data: {
          tokenData,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//// logout User////
const logoutUser = asyncHandler(async (req, res) => {
  console.log(req.user._id, "in login from auth ");
  ////send HTTP-Only cookie///
  res.cookie("access_token", "", {
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
  console.log(req.params?.id, "params");
  const user = await User.findById(req.params.id);
  console.log(user);
  if (user) {
    const {_id, name, email, photo, phone, bio, role} = user;
    res.status(200).json({
      message: "user Data Fetched Successfully!",
      data: {
        _id,
        name,
        email,
        photo,
        phone,
        bio,
        role,
      },
    });
  } else {
    res.status(400);
    throw new Error("User Not Found !");
  }
});
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  console.log(users, "users");
  if (users) {
    res.status(200).json({
      message: "users Data Fetched Successfully!",
      data: users,
    });
  } else {
    res.status(400);
    throw new Error("User Not Found !");
  }
})

///login status /login/logout?//////
const loginStatus = asyncHandler(async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRECT);
      // Get user from the token
      let user = await User.findById(decoded.id).select("-password");
      res.status(200).json(user);
      console.log(user, "protected user");
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

/////Update User Profile /////
const updateUser = asyncHandler(async (req, res) => {
  console.log(req.body, "see");
  const user = await User.findById(req.body._id);
  let profilePhoto = req?.file
    ? `http://localhost:8000/${req?.file?.path.replace(/\\/g, "/")}`
    : null;
  if (user) {
    console.log(req.body, "avaul");

    const {name, email, photo, phone, bio, role} = user;
    user.email = email;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.role = req.body.role || role;
    user.bio = req.body.bio || bio;
    user.photo = profilePhoto || photo;
    // user.webLogo = profilePhoto||null;
    
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
        webLogo:updatedUser?.webLogo
      },
    });
  } else {
    res.status(404);
    throw new Error("user not Found");
  }
});
const updateLogo = asyncHandler(async (req, res) => {
  console.log(req.body, "see");
  const isLogoExist = await WebLogo.find();
  console.log(isLogoExist,"seeee");
  let profilePhoto = req?.file
    ? `http://localhost:8000/${req?.file?.path.replace(/\\/g, "/")}`
    : null;
  if (profilePhoto) {
    console.log(req.body, "avaul");
    // const weblogo = isLogoExist[0].webLogo;
    // // user.photo = profilePhoto || photo;
    let webLogo = profilePhoto;
if(isLogoExist?.length>0){
    let updatedUser = await  WebLogo.updateOne({webLogo: webLogo})
    res.status(200).json({
      message: "Logo updated Successfully",
      data: {
        _id: updatedUser._id,
        webLogo: updatedUser?.webLogo,
      },
    });
}else{
  let updatedUser= WebLogo.create({webLogo: webLogo})
    res.status(200).json({
      message: "Logo updated Successfully",
      data: {
        _id: updatedUser._id,
        webLogo: updatedUser?.webLogo,
      },
    });
}
  } else {
    res.status(404).json("Please select logo");
    // throw new Error("user not Found");
  }
});
// get weblogo/////////////////////
const getWebLogo = asyncHandler(async (req, res) => {
  const webLogo = await WebLogo.find();
  console.log(webLogo, "logos");
  if (webLogo) {
    res.status(200).json({
      message: "webLogo Data Fetched Successfully!",
      data: webLogo,
    });
  } else {
    res.status(400);
    throw new Error("Logo Not Found !");
  }
});

////////changing old password into new///
const changePassword = asyncHandler(async (req, res) => {
  console.log(req.body, "reset pass");
  const user = await User.findById(req.body._id);
  const {oldPassword, password} = req.body;
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
    res.status(400).json({message: "Old Password doesn't match"});
    // throw new Error("Old Password doesn't match");
  }
});

////forgot the password router/////
const forgotPassword = asyncHandler(async (req, res) => {
  const {email} = req.body;
  console.log(req.body, "for forget password ");
  /// CHECK IF EMAIL EXISTS IN DATABASE////
  const user = await User.findOne({email});
  if (!user) {
    res.status(404).json("user doesn't exist!");
    // throw new Error("User doesn't exist!");
  }

  ////delete token if it exists in database///
  let isTokenExist = await Token.findOne({userId: user._id});
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
  <p>Ameer minaie</p>
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
  const {password} = req.body;
  const {resetToken} = req.params;

  ///hashedToken and then compare with stored token into db ////
  let hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const isTokenExist = await Token.findOne({
    token: hashedToken,
    expiresAt: {$gt: Date.now()},
  });

  if (!isTokenExist) {
    console.log("token exist");
    res.status(404).json("token not found");
    // throw new Error("Invalid or expired token");
  }
  ///Find the user with id stored into token model///
  const user = await User.findOne({_id: isTokenExist.userId});
  user.password = password;
  await user.save();
  res.status(200).json({message: "Password reset Successfully!", data: {}});
});
//////////////////delete User api
const deleteUser = async (req, res) => {
  try {
    User.findByIdAndRemove(
      {_id: mongodb.ObjectId(req.body.id)},
      function (err, docs) {
        if (err) {
          console.log("err", err);
          res.status(201).json({
            success: false,
            message: err.toString(),
          });
        } else {
          res.status(200).json({
            success: true,
            message: "User deleted successfully...!",
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.toString(),
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getUsers,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
  deleteUser,
  storetokenData,
  updateLogo,
  getWebLogo,
};

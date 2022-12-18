const asyncHandler = require("express-async-handler"); ///for not using trycatch block////
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const protectApi = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, please login");
  }
  ////verified jwt token///
  const verified = jwt.verify(token, process.env.JWT_SECRECT);
  /////get user data from token///
  const user = await User.findById(verified.id).select("-password");
  if (!user) {
    res.status(401);
    throw new Error("User not Found!");
  }
  req.user = user;
  next();
});
module.exports = protectApi;

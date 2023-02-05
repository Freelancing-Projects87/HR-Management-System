const asyncHandler = require("express-async-handler"); ///for not using trycatch block////
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const protectApi = asyncHandler(async (req, res, next) => {
  // const token = req.cookies.access_token;
  // if (!token) {
  //   res.status(401).json('Not Authorized User')
  //   // throw new Error("Not Authorized, please login");
  // }
  // ////verified jwt token///
  // const verifiedUser = jwt.verify(token, process.env.JWT_SECRECT,(err,userId)=>{
  //   if(err){
  //     return res.status(403).json('Invalid Token')
  //   }
  //   req.user={_id:userId}
  //   console.log(userId,"maybe");
  //     next();
  // })
  // // console.log(verifiedUser,"check user");

  // /////get user data from token///
  // // const user = await User.findById(verifiedUser.id).select("-password");
  // // if (!user) {
  // //   res.status(401);
  // //   throw new Error("User not Found!");
  // // }
  // // req.user = user;

  //////////////////// new protect middleware
  let token ;
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
      req.user = await User.findById(decoded.id).select("-password");
      console.log(req.user, "protected user");
      next();
    } catch (error) {
      // console.log(error);
      if(error){
      res.status(401).json("not autheticated");
      // throw new Error("Not authorized");
      }
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
module.exports = protectApi;

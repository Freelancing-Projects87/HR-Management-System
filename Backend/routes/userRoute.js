const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
} = require("../controllers/userController");
const protectApi = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getuser", protectApi, getUser);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protectApi, updateUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const protectApi = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");



// storage engine

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 200 * 1024 * 1024,
  },
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getuser/:id", getUser);
router.get("/loggedin", loginStatus);
router.patch("/updateuser",upload.single('photo'), updateUser);
router.patch("/changepassword", protectApi, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetPassword/:resetToken", resetPassword);


module.exports = router;

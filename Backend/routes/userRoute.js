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
  getUsers,
  deleteUser,
  storetokenData,
  updateLogo,
  getWebLogo,
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
router.post('/storetoken_data',storetokenData)
router.get("/logout",protectApi, logoutUser);
router.get("/getuser/:id", protectApi, getUser);
router.get("/getusers",protectApi, getUsers);
router.post("/deleteuser",protectApi, deleteUser);
router.get("/loggedin",protectApi, loginStatus);
router.patch("/updateuser",protectApi,upload.single('photo'), updateUser);
router.patch("/updatelogo", protectApi, upload.single('webLogo'), updateLogo);
router.get('/getweblogo',protectApi,getWebLogo)
router.patch("/changepassword", protectApi, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetPassword/:resetToken", resetPassword);


module.exports = router;

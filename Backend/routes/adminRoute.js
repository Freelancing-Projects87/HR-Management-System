const express = require("express");
const router = express.Router();
const {
  addCandidate,
  updateCandidate,
  deleteCandidate,
  getAllcandidate,
  addBusinessPipeline,
  updateBusinessline,
  getAllBusinessPipeline,
  deleteBusinessPipeline
} = require("../controllers/adminController");
const multer = require("multer");
const path = require("path");
const protectApi = require("../middleware/authMiddleware");


// storage engine

const storage = multer.diskStorage({
  destination: "./images",
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

router.post("/addCandidate",upload.single("cv"), addCandidate);
router.post("/update_candidate",upload.single("cv"), updateCandidate);
router.post("/delete_candidate", deleteCandidate);
router.get("/getCandidates", getAllcandidate);
router.post("/addBusinessline",  addBusinessPipeline);
router.post("/update_Businessline", updateBusinessline);
router.post("/delete_Businessline", deleteBusinessPipeline);
router.get("/getBusinessline", getAllBusinessPipeline);

module.exports = router;

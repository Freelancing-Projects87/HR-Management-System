const express = require("express");
const router = express.Router();
const {
  addCandidate,
  updateCandidate,
  deleteCandidate,
  getAllcandidate
} = require("../controllers/adminController");
const protectApi = require("../middleware/authMiddleware");

router.post("/addCandidate", addCandidate);
router.post("/update_candidate",updateCandidate);
router.post("/delete_candidate", deleteCandidate);
router.get("/getCandidates", getAllcandidate);

module.exports = router;

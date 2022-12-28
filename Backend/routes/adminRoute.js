const express = require("express");
const router = express.Router();
const {
  addCandidate,updateCandidate
} = require("../controllers/adminController");
const protectApi = require("../middleware/authMiddleware");

router.post("/addCandidate", addCandidate);
router.post('/update_candidate',updateCandidate)
router.post("/get_candidate", updateCandidate);


module.exports = router;

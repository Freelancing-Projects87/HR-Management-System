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
  deleteBusinessPipeline,
  addQuiz,
  addInterview,
  addBusinessCase,
  updateBusinessCase,
  getAllBusinessCase,
  deleteBusinessCase,
  CandidateGrade,
  adddFieldToCandidate,
  getSkills,
  updateSkill,
  deleteSkill,
  addskill,
  getCandidatesInterviews,
  addQuestion,
  downloadCv,
  deleteQuestion,updateQuestion,getQuestions
} = require("../controllers/adminController");
const multer = require("multer");
const path = require("path");
const protectApi = require("../middleware/authMiddleware");
const { route } = require("./userRoute");


// storage engine

const storage = multer.diskStorage({
  destination: "./cvs",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    )
  },
});
const fileFilter = (req, file, cb) => {
  //reject a file if it's not a jpg or png
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 200 * 1024 * 1024,
  },
  // fileFilter: fileFilter,
});

router.post("/addCandidate",upload.single('cv'), addCandidate);
router.post("/update_candidate",upload.single('cv'), updateCandidate);
router.post("/delete_candidate", deleteCandidate);
router.get("/getCandidates",protectApi, getAllcandidate);
router.post("/addBusinessline",  addBusinessPipeline);
router.post("/update_Businessline", updateBusinessline);
router.post("/delete_Businessline", deleteBusinessPipeline);
router.get("/getBusinessline", getAllBusinessPipeline);
router.post("/quizadd",addQuiz);
router.post("/addInterview", addInterview);
router.get("/getInterviews/:id",getCandidatesInterviews)
router.post("/adddFieldToCandidate", adddFieldToCandidate);
router.post("/addGrades", CandidateGrade);
router.post('/addBusinessCase',addBusinessCase);
router.post('/updateBusinessCase',updateBusinessCase);
router.get('/getBusinessCase',getAllBusinessCase);
router.post('/deleteBusinessCase',deleteBusinessCase)
router.get('/getskills',getSkills)
router.post('/addskill',addskill)
router.post('/updatekill',updateSkill)
router.post('/deleteskill',deleteSkill)
router.post('/addQuestion',addQuestion);
router.post('/updateQuestion',updateQuestion);
router.post('/deleteQuestion',deleteQuestion);
router.get('/getQuestions',getQuestions);
router.get('/getcandidatecv/:id',downloadCv);


module.exports = router;

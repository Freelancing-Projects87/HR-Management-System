const asyncHandler = require("express-async-handler"); ///for not using trycatch block////
const Candidate = require("../models/Candidate");
const protectApi = require("../middleware/authMiddleware");

////User Routes/////

////RegisterUser Route controller/////////
const updateCandidate = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    Candidate.findByIdAndUpdate(
      req.body.id,
      {
        name: req.body.name,
        recomendation: req.body.recomendation,
        startingDate: req.body.startingDate,
        grade: req.body.grade,
      },
      function (err, docs) {
        if (err) {
          console.log(err);
          res.status(201).json({
            success: false,
            message: err.toString(),
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Candidate updated successfully...!",
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(201).json({
      success: false,
      message: err.toString(),
    });
  }
});
const addCandidate = async (req, res) => {
  const {name, recomendation, startingDate, grade} = req.body;
  if (!name || !recomendation || !startingDate || !grade) {
    res.status(400);
    throw new Error("Please insert all required fields");
  }

  //   create new user
  const CandidateData = await Candidate.create({
    name,
    recomendation,
    startingDate,
    grade,
  });

  if (name) {
    const {name, recomendation, startingDate, grade, _id} = CandidateData;

    res.status(201).send({
      message: "Candidate Created Successfully!",
      data: {
        _id,
        name,
        name,
        recomendation,
        startingDate,
        grade,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid Candidate Data");
  }
};

module.exports = {
  addCandidate,
  updateCandidate,
};

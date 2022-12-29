const asyncHandler = require("express-async-handler"); ///for not using trycatch block////
const Candidate = require("../models/Candidate");
const protectApi = require("../middleware/authMiddleware");
var mongodb = require("mongodb");

////User Routes/////

////RegisterUser Route controller/////////

const updateCandidate = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    Candidate.findByIdAndUpdate(
      mongodb.ObjectId(req.body._id),
      {
        firstname: req.body.firstname,
        recomendation: req.body.recomendation,
        startingDate: req.body.startingDate,
        grade: req.body.grade,
        lastname: req.body.lastname,
        email: req.body.email,
        nationality: req.body.nationality,
        cv: req.body.cv,
        phone: req.body.phone,
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
  const {
    firstname,
    lastname,
    email,
    nationality,
    cv,
    phone,
    recomendation,
    startingDate,
    grade,
  } = req.body;
  if (!firstname) {
    res.status(400);
    throw new Error("Please insert all required fields");
  }

  //   create new user
  const CandidateData = await Candidate.create({
    firstname,
    recomendation,
    startingDate,
    grade,
    lastname,
    email,
    nationality,
    cv,
    phone,
  });

  if (firstname) {
    const {
      firstname,
      recomendation,
      startingDate,
      grade,
      lastname,
      email,
      nationality,
      cv,
      phone,
      _id,
    } = CandidateData;

    res.status(201).send({
      message: "Candidate Created Successfully!",
      data: {
        firstname,
        recomendation,
        startingDate,
        grade,
        lastname,
        email,
        nationality,
        cv,
        phone,
        _id,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid Candidate Data");
  }
};
const deleteCandidate = async (req, res) => {
  console.log(req.body.id, "del candidate id..........");
  try {
    Candidate.findByIdAndRemove(
      {_id: mongodb.ObjectId(req.body.id)},
      function (err, docs) {
        if (err) {
          console.log("err", err);
          res.status(201).json({
            success: false,
            message: err.toString(),
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Candidate deleted successfully...!",
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
};
const getAllcandidate = async (req, res, next) => {
  try {
    Candidate.find(async (err, data) => {
      if (err) {
        console.log(err);
      }
      if (!data) {
        console.log("User not found");
        return;
      }
      res.status(200).json({
        success: true,
        data: data,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(201).json({
      success: false,
      message: err.toString(),
    });
  }
};

module.exports = {
  addCandidate,
  updateCandidate,
  deleteCandidate,
  getAllcandidate,
};

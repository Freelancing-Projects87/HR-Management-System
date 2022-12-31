const asyncHandler = require("express-async-handler"); ///for not using trycatch block////
const Candidate = require("../models/Candidate");
const BusinessPipeline = require("../models/BusinessPipeline");
const protectApi = require("../middleware/authMiddleware");
var mongodb = require("mongodb");

////Admin Routes/////

////RegisterUser Route controller/////////

const updateCandidate = async (req, res) => {
  console.log(req.body, "edit data in server");
  let cv = `http://localhost:8000/cv/${req.file.filename}`;

  try {
    console.log(req.body, "edit data in server");
    Candidate.findByIdAndUpdate(
      mongodb.ObjectId(req.body._id),
      {
        firstname: req.body?.firstname,
        recomendation: req.body?.recomendation,
        startingDate: req.body?.startingDate,
        grade: req.body?.grade,
        lastname: req.body?.lastname,
        email: req.body?.email,
        nationality: req.body?.nationality,
        cv: cv,
        phone: req.body?.phone,
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
};

const addCandidate = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    nationality,
    phone,
    recomendation,
    startingDate,
    grade,
  } = req.body;
  console.log(req.body, "add data");
  let cv = `http://localhost:8000/cv/${req.file.filename}`;
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
        cv: `http://localhost:8000/cv/${req.file.filename}`,
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
        console.log("Candidates not found");
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
//  bussiness pipeline controllers
const updateBusinessline = async (req, res) => {
  try {
    console.log(req.body, "edit data in server");
    BusinessPipeline.findByIdAndUpdate(
      mongodb.ObjectId(req.body.id),
      {
        requester: req.body?.requester,
        neededBy: req.body?.neededBy,
        internAssigned: req.body?.internAssigned,
        project: req.body?.project,
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
            message: "Bussiness pipeline updated successfully...!",
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

const addBusinessPipeline = async (req, res) => {
  const {requester, neededBy, project, internAssigned} = req.body;
  console.log(req.body, "add  b pipe l");
  if (!requester) {
    res.status(400);
    throw new Error("Please insert all required fields");
  }

  //   create new user
  const businessline = await BusinessPipeline.create({
    requester,
    neededBy,
    project,
    internAssigned,
  });

  if (requester) {
    const {requester, neededBy, project, internAssigned,_id} = businessline;

    res.status(200).send({
      message: "BusinessPipeline Created Successfully!",
      data: {
        requester,
        neededBy,
        project,
        internAssigned,
        _id
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid Business pipeline  Data");
  }
};
const deleteBusinessPipeline = async (req, res) => {
  console.log(req.body.id, " b p l id..........");
  try {
    BusinessPipeline.findByIdAndRemove(
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
            message: "Business pipeline deleted successfully...!",
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
const getAllBusinessPipeline = async (req, res, next) => {
  try {
    BusinessPipeline.find(async (err, data) => {
      if (err) {
        console.log(err);
      }
      if (!data) {
        console.log("bussiness pipeline not found");
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
  addBusinessPipeline,
  updateBusinessline,
  getAllBusinessPipeline,
  deleteBusinessPipeline
};

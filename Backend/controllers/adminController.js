const asyncHandler = require("express-async-handler"); ///for not using trycatch block////
const Candidate = require("../models/Candidate");
const Interview = require("../models/Interviews");
const Businesscase = require("../models/BusinessCase");
const BusinessPipeline = require("../models/BusinessPipeline");
const Skill = require("../models/Skills");
const protectApi = require("../middleware/authMiddleware");
var mongodb = require("mongodb");
const {default: mongoose} = require("mongoose");

////Admin Routes/////

////RegisterUser Route controller/////////

const updateCandidate = async (req, res) => {
  console.log(req.body, "edit data in server");
  let cv = `http://localhost:8000/cv/${req.file?.filename}`;

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
  let cv = `http://localhost:8000/cv/${req.file?.filename}`;
  if (!firstname || !lastname || !email || !phone) {
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

  if (firstname && email) {
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
        cv: `cv/${req.file?.filename}`,
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
      console.log(data, "data all candidates");
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

//  bussiness case controllers start from here////////////////////
const addBusinessCase = async (req, res) => {
  const {bcTitle, difficulty, type, expectedTime, excelData} = req.body;
  console.log(req.body, "b case");
  if (!bcTitle || !difficulty || !type || !expectedTime) {
    res.status(400);
    throw new Error("Please insert all required fields");
  }

  //   create new user
  const businessCase = await Businesscase.create({
    bcTitle,
    difficulty,
    type,
    expectedTime,
    excelData,
  });

  if (bcTitle) {
    const {bcTitle, difficulty, type, excelData, expectedTime, _id} =
      businessCase;

    res.status(200).send({
      message: "Business Case Created Successfully!",
      data: {
        bcTitle,
        difficulty,
        type,
        expectedTime,
        excelData,
        _id,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid Business pipeline  Data");
  }
};
const updateBusinessCase = async (req, res) => {
  try {
    console.log(req.body, "edit data in server");
    Businesscase.findByIdAndUpdate(
      mongodb.ObjectId(req.body.id),
      {
        bcTitle: req.body?.bcTitle,
        type: req.body?.type,
        expectedTime: req.body?.expectedTime,
        difficulty: req.body?.difficulty,
        excelData: req.body?.excelData,
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
            message: "Bussiness Case updated successfully...!",
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
const deleteBusinessCase = async (req, res) => {
  console.log(req.body.id, " b c id..........");
  try {
    Businesscase.findByIdAndRemove(
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
            message: "Business Case deleted successfully...!",
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
const getAllBusinessCase = async (req, res, next) => {
  try {
    Businesscase.find(async (err, data) => {
      if (err) {
        console.log(err);
      }
      if (!data) {
        console.log("bussiness Case not found");
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
//  bussiness pipeline controllers start from here////////////////////
const updateSkill = async (req, res) => {
  try {
    console.log(req.body, "skill from client");
    Skill.findByIdAndUpdate(
      mongodb.ObjectId(req.body.id),
      {
        skill: req.body?.skill,
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
            message: "skill updated successfully...!",
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

const addskill = async (req, res) => {
  const {skill} = req.body;
  console.log(req.body, "skill add");
  if (!skill) {
    res.status(400);
    throw new Error("Please insert all required fields");
  }

  //   create new user
  const skillData = await Skill.create({
    skill,
  });

  if (skill) {
    const {skill, _id} = skillData;

    res.status(201).send({
      message: "Skill Created Successfully!",
      data: {
        skill,
        _id,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid Business pipeline  Data");
  }
};
const deleteSkill = async (req, res) => {
  console.log(req.body.id, " skill delete id..........");
  try {
    Skill.findByIdAndRemove(
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
            message: "Skill deleted successfully...!",
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
const getSkills = async (req, res, next) => {
  try {
    Skill.find(async (err, data) => {
      if (err) {
        console.log(err);
      }
      if (!data) {
        console.log("skills not found");
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
// skills rest api start from here
//  bussiness pipeline controllers start from here////////////////////
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
    const {requester, neededBy, project, internAssigned, _id} = businessline;

    res.status(200).send({
      message: "BusinessPipeline Created Successfully!",
      data: {
        requester,
        neededBy,
        project,
        internAssigned,
        _id,
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

// quiz controler start from here
const addQuiz = async (req, res, next) => {
  console.log(req.body, "quiz data");
  try {
    Candidate.findByIdAndUpdate(
      {_id: new mongodb.ObjectId(req.body.id)},
      {
        $set: {
          // quizData: req.body.QA,
          isInterviewed: req.body.isInterviewed,
          // skills: req.body.skills,
          // recomendation: req.body.recomendation,
          // businessCaseId: new mongodb.ObjectId(req.body.businessCase),
          // totalScore: req.body.totalScore,
          // totalGrade: req.body.totalGrade,
          // averageGrade: req.body.averageGrade,
          // excelData: req.body.exceldata,
        },
      },
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
            message: "Quiz Added to candidate profile successfully...!",
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
// add second interView
const addInterview = async (req, res, next) => {
  console.log(req.body.id.id, "interview wa honay bacho ji");
  const {QA} = req.body;
  console.log(req.body, "interview");
  if (!QA) {
    res.status(400);
    throw new Error("Please add quiz");
  }
  //   create interview
  const CandidateData = await Interview.create({
    quizData: QA,
    candidateId: new mongodb.ObjectId(req.body.id?.id),
    businessCaseId: new mongodb.ObjectId(req.body.businessCase),
    totalScore: req.body.totalScore,
    totalGrade: req.body.totalGrade,
    averageGrade: req.body.averageGrade,
  });

  if (QA) {
    const {quizData} = CandidateData;

    res.status(200).send({
      message: "inteview Created Successfully!",
      data: {
        quizData,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid Candidate Data");
  }
};
// get Candidate Interview ///////////////////////////////////
const getCandidatesInterviews=async(req,res,next)=>{
  console.log(req.params.id,"inter id");
    try {
      Interview.find(
        {candidateId: req.params.id},
        async (err, data) => {
          if (err) {
            console.log(err);
          }
          if (!data) {
            console.log("Data not found");
            return;
          } else {
            res.status(200).json({
              success: true,
              data: data,
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
}
// update specific fields intead of pushing in candidate collection
const adddFieldToCandidate = async (req, res, next) => {
  console.log(req.body, "extra fields");
  try {
    Candidate.findByIdAndUpdate(
      {_id: new mongodb.ObjectId(req.body.id)},
      {
        $set: {
          isInterviewed: req.body.isInterviewed,
          skills: req.body.skills,
          recomendation: req.body.recomendation,
          businessCaseId: new mongodb.ObjectId(req.body.businessCase),
          excelData: req.body.exceldata,
          averageGrade: req.body.averageGrade,
        },
      },
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
            message: "Quiz fields added successfully...!",
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
const CandidateGrade = async (req, res, next) => {
  console.log(req.body, "quiz data");
  try {
    // update(
    //   {user_id: 123456, "items.item_name": "my_item_two"},
    //   {$inc: {"items.$.price": 1}},
    //   false,
    //   true
    // );
    Candidate.update(
      {
        // _id: new mongodb.ObjectId(req.body.candidateId),
        "quizData.id": {$eq: req.body.id},
      },
      {$set: {"quizData.$.finalPercentage": req.body.finalPercentage}},
      // {
      //   $push: {
      //     grading: req.body.grading,
      //   },
      // },
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
            message: "Score Added to Candidate Profile successfully...!",
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

module.exports = {
  addCandidate,
  updateCandidate,
  deleteCandidate,
  getAllcandidate,
  addBusinessPipeline,
  updateBusinessline,
  getAllBusinessPipeline,
  deleteBusinessPipeline,
  addQuiz,
  addBusinessCase,
  updateBusinessCase,
  deleteBusinessCase,
  getAllBusinessCase,
  CandidateGrade,
  addskill,
  updateSkill,
  deleteSkill,
  getSkills,
  addInterview,
  getCandidatesInterviews,
  adddFieldToCandidate,
};

const mongoose = require("mongoose");

const Candidates = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: false,
    },
    recomendation: {
      type: String,
      required: false,
    },
    startingDate: {
      type: Date,
      required: false,
    },
    recomendation: {
      type: String,
      required: false,
    },
    lastname: {
      type: String,
      required: false,
    },
    nationality: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    averageGrade: {
      type: String,
      required: true,
    },
    cv: {
      type: String,
      required: [false, "Please add your CV"],
    },
    totalGrade: String || Number,
    quizData: [
      {
        question: String,
        answer: String,
        id: Number,
        percent: String,
        // totalGrade: String || Number,
        totalScore: String || Number,
        grade: String,
      },
    ],
    skills: [
      {
        skill: String,
      },
    ],
    grading: [
      {
        grade: String,
        score: String,
      },
    ],
    isInterviewed: {
      type: Boolean,
      required: [false, "yes interview is happend"],
    },
    excelData: {
      context: String,
      approach: String,
      expectedResult: String,
    },
    totalScore: {type: Number, required: false},
    businessCaseId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Candidate = mongoose.model("candidate", Candidates);
module.exports = Candidate;

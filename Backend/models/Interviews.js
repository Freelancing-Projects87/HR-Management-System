const mongoose = require("mongoose");

const Interview = mongoose.Schema(
  {
    averageGrade: {
      type: String,
      required: false,
    },
    totalGrade: Number,
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
    candidateId: {
      type: String,
    },
    businessCaseId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const interView = mongoose.model("interView", Interview);
module.exports = interView;

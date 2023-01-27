const mongoose = require("mongoose");

const Interview = mongoose.Schema(
  {
    averageGrade: {
      type: String,
      required: false,
    },
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
    totalScore: {type: Number, required: false},
    totalScore2: {type: Number, required: false},
    candidateId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const interView = mongoose.model("interView", Interview);
module.exports = interView;

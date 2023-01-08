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
    cv: {
      type: String,
      required: [false, "Please add your CV"],
    },
    quizData: [
      {
        question: String,
        answer: String,
        id: Number,
        percent: String,
        finalPercentage:String,
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
      required: [true, "yes interview is happend"],
    },
  },
  {
    timestamps: true,
  }
);

const Candidate = mongoose.model("candidate", Candidates);
module.exports = Candidate;

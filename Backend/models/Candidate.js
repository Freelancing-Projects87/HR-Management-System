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
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    cv: {
      type: String,
      required: [true, "Please add your Profile Image"],
    },
  },
  {
    timestamps: true,
  }
);

const Candidate = mongoose.model("candidate", Candidates);
module.exports = Candidate;

const mongoose = require("mongoose");

const Candidates = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  recomendation: {
    type: String,
    required: true,
  },
  startingDate: {
    type: Date,
    required: true,
    
  },
});

const Candidate = mongoose.model("candidate", Candidates);
module.exports = Candidate;

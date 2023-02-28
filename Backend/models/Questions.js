const mongoose = require("mongoose");

const Qurstions = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  percentage:{
    type:Number,
    required:true
  }
});

const Questions = mongoose.model("question", Qurstions);
module.exports = Questions;

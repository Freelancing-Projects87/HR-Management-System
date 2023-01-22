const mongoose = require("mongoose");

const BusinessCase = mongoose.Schema(
  {
    bcTitle: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    excelData: {
      context: String,
      approach: String,
      expectedResult: String,
    },
    expectedTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Businesscase = mongoose.model("BusinessCase", BusinessCase);
module.exports = Businesscase;

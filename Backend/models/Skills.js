const mongoose = require("mongoose");

const skill = mongoose.Schema(
  {
    skill: {
      type: String,
      required: true,
    },
  }
);

const Skill = mongoose.model("skill", skill);
module.exports = Skill;

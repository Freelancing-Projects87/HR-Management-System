const mongoose = require("mongoose");

const BusinessPileline = mongoose.Schema(
  {
    requester: {
      type: String,
      required: true,
    },
    internAssigned: {
        
      type: String,
      required: true,
    },
    project: {
      type: String,
      required: true,
    },
    neededBy: {
      type: Date,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Businessline = mongoose.model("BusinessPileline", BusinessPileline);
module.exports = Businessline;

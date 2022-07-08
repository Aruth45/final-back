const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    action: { type: String, required: true },
    amount: { type: Number, required: true },
    destination: { type: String, required: true },
  },

  {
    timestamps: true,
  }
);
const History = mongoose.model("History", historySchema);

module.exports = History;

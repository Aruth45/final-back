const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  action: { type: String, required: true },
  details: { type: String, required: true },
});

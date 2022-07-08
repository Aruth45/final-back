const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  category: { type: String, required: true },
  company: { type: String, required: true },
  amount: { type: Number, required: true },
  isPaid: { type: Boolean, required: true },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;

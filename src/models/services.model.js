const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  isPaid: { type: Boolean, required: true },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;

const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  account: { type: Number, required: true, unique: true },
  balance: { type: Number, required: true, default: 0 },
  type: { type: String, required: true },
  userID: { type: mongoose.Types.ObjectId, ref: "User" },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;

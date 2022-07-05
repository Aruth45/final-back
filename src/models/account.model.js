const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  account: { type: Number, required: true, unique: true },
  balance: { type: Number, required: true, default: 0 },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;

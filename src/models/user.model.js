const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  profilePic: { type: String, required: true },
  ocupation: { type: String, required: true },
  identification: {
    type: String,
    required: true,
    minLength: 9,
    unique: true,
    maxLength: 9,
  },
  incomeSource: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email address",
    ],
    unique: [true, "Email must be unique"],
  },

  password: { type: String, required: true, minLength: 8 },
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);
module.exports = User;

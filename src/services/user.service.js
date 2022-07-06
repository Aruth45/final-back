const User = require("../models/user.model");

class UserService {
  static async getAllUsers() {
    const users = await User.find().select("-password -__v");
    return users;
  }

  static async getUser(id) {
    const user = await User.findById(id).select("-password");
    return user;
  }

  static async getUserByEmail(email) {
    const user = await User.findOne({ email: email });
    return user;
  }

  static async addUser(userData) {
    const user = new User(userData);
    await user.save();
    return user;
  }

  static async updateUser(id, newData) {
    const updatedUser = await User.findByIdAndUpdate(id, newData, {
      returnDocument: "after",
      runValidators: true,
    });

    return updatedUser;
  }

  static async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    return user;
  }
}

module.exports = UserService;

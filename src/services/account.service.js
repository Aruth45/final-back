const Account = require("../models/account.model");

class AcccountService {
  static async getAllAccounts(id) {
    const accounts = await Account.find({ userID: id });
    return accounts;
  }

 

  static async getAccount(origin) {
    const account = await Account.findOne({ account: origin });
    return account;
  }

  static async updateAccount(id, newData) {
    const updatedAccount = await Account.findByIdAndUpdate(id, newData, {
      new: true,
      runValidators: true,
    });

    return updatedAccount;
  }

  static async addAccount(id) {
    const accountNumber = Math.floor(Math.random() * 99999999999999999999);
    const balance = Math.floor(Math.random() * 9999999 - Math.random() * 9999);
    const account = new Account({
      userID: id,
      account: accountNumber,
      balance: balance,
      type: "Checking",
    });

    await account.save();
    return account;
  }
}

module.exports = AcccountService;

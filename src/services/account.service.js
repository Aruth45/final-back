const Account = require("../models/account.model");

class AcccountService {
  static async getAllAccounts(id) {
    const accounts = await Account.find({ userID: id });
    return accounts;
  }

  static async addAccount(id) {
    const accountNumber = Math.floor(Math.random() * 99999999999999999999);
    const balance = Math.floor(Math.random() * 9999999);
    const account = new Account({
      userID: id,
      account: accountNumber,
      balance: balance,
    });

    await account.save();
    return account;
  }
}

module.exports = AcccountService;

const History = require("../models/history.model");

class HistoryService {
  static async getHistory(id) {
    const history = await History.find({ userID: id });
    return history;
  }

  static async addRecord(recordData) {
    const record = new History(recordData);
    await record.save();
    return record;
  }
}

module.exports = HistoryService;

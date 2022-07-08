const express = require("express");
const transactionsRouter = express.Router();
const AcccountService = require("../services/account.service");
const Service = require("../services/service");
const History = require("../services/history.service");

transactionsRouter.route("/payment").put(async (req, res) => {
  try {
    const account = await AcccountService.getAccount(req.body.origin);

    if (account) {
      const updatedAccount = await AcccountService.updateAccount(account._id, {
        balance: account.balance - req.body.amount,
      });

      const updatedService = await Service.updateService(req.body.service, {
        isPaid: true,
      });

      const newRecord = await History.addRecord({
        userID: req.body.userID,
        action: "Service Payment",
        amount: req.body.amount,
        destination: `${updatedService.category} bill payment made to ${updatedService.company}`,
      });

      res.json({
        success: "Payment sucessfull",
        updatedAccount,
        updatedService,
        newRecord,
      });
    } else {
      res.json({ error: "Origin account not found" });
    }
  } catch (err) {
    res.json({ error: "Payment cound not be completed", details: err });
  }
});

transactionsRouter.route("/transfermoney").put(async (req, res) => {
  try {
    const originAccount = await AcccountService.getAccount(req.body.origin);
    const destinationAccount = await AcccountService.getAccount(
      req.body.destination
    );

    if (originAccount.account === destinationAccount.account) {
      return res.json({
        error:
          "The origin acccount cannot be the same as the destination account",
      });
    } else if (originAccount.userID === destinationAccount.userID) {
      return res.json({
        error: "You cannot transfer money to your self",
      });
    }

    const updatedOriginAccount = await AcccountService.updateAccount(
      originAccount._id,
      { balance: originAccount.balance - req.body.amount }
    );

    const updatedDestinationAccount = await AcccountService.updateAccount(
      destinationAccount._id,
      { balance: destinationAccount.balance + req.body.amount }
    );

    const recordDestination = await History.addRecord({
      userID: destinationAccount.userID,
      action: "Money transfer",
      amount: req.body.amount,
      destination: `You received ${req.body.amount}`,
    });

    const recordOrigin = await History.addRecord({
      userID: originAccount.userID,
      action: "Money Transfer",
      amount: req.body.amount,
      destination: `You transferred ${req.body.amount}`,
    });

    res.json({
      success: "Transaction completed",
      updatedOriginAccount,
      updatedDestinationAccount,
      recordDestination,
      recordOrigin,
    });
  } catch (err) {
    res.json({ error: "Transaction could not be completed", details: err });
  }
});

module.exports = transactionsRouter;

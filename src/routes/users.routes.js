const express = require("express");
const UserService = require("../services/user.service");
const AcccountService = require("../services/account.service");
const Services = require("../services/service");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

userRouter.route("/").get(async (req, res) => {
  const users = await UserService.getAllUsers();
  res.json(users);
});

userRouter
  .route("/getuser")
  .get(async (req, res) => {
    const token = req.headers["x-access-token"];

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const id = decoded.id;
      const user = await UserService.getUser(id);
      const accounts = await AcccountService.getAllAccounts(id);
      const services = await Services.getAllServices(id);

      res.json({ user, accounts, services });
    } catch (err) {
      res.json({ error: "Object could not be found", details: err });
    }
  })

  .put(async (req, res) => {
    const userID = req.params.id;
    const userData = req.body;

    try {
      const updatedUser = await UserService.updateUser(userID, userData);
      res.json(updatedUser);
    } catch (err) {
      res.status(500);
      res.json({ error: "Object could not be updated", details: err });
    }
  })

  .delete(async (req, res) => {
    const userID = req.params.id;

    try {
      const deletedUser = await UserService.deleteUser(userID);
      res.json(deletedUser);
    } catch (err) {
      res.json({ error: "Object could not be deleted", details: err });
    }
  });

userRouter.route("/").post(async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const userData = { ...req.body, password: hashedPassword };
    const createdUser = await UserService.addUser(userData);
    const createdAccount = await AcccountService.addAccount(createdUser._id);
    await Services.addService(createdUser._id);

    res.send({
      success: "Account created sucessfully",
      user: createdUser,
      account: createdAccount,
    });
  } catch (err) {
    res.send({ error: "Object could not be created", details: err });
  }
});

userRouter.route("/login").post(async (req, res) => {
  const userFound = await UserService.getUserByEmail(req.body.email);

  if (!userFound) return res.json({ error: "User not found" });

  const matchPassword = await bcrypt.compare(
    req.body.password,
    userFound.password
  );

  if (!matchPassword)
    return res.status(401).json({ token: null, error: "Invalid password" });

  const token = jwt.sign({ id: userFound._id }, process.env.SECRET_KEY);
  res.send({ token: token, userID: userFound._id });
});

userRouter.route("/upload/:id").put(async (req, res) => {
  console.log(req.body);
});

module.exports = userRouter;

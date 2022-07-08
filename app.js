const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const userRouter = require("./src/routes/users.routes");
const transactionsRouter = require("./src/routes/trasactions.routes");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const DB_HOST = process.env.DB_HOST || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "bank-fp";

mongoose
  .connect(`${DB_HOST}/${DB_NAME}`)
  .then(() => {
    console.log(`Connection to ${DB_HOST}/${DB_NAME} opened`);
  })
  .catch((err) => {
    console.log("Error connecting to mongo: ", err);
  });

app.use("/users", userRouter);
app.use("/transactions", transactionsRouter);

module.exports = app;

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const logger = require("./src/middleware/logger.middleware");
const cors = require("cors");
const userRouter = require("./src/routes/users.routes");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const DB_HOST = process.env.DB_HOST || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "bank-fp";
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "konradisthesecretword",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("konradisthesecretword"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

mongoose
  .connect(`${DB_HOST}/${DB_NAME}`)
  .then(() => {
    console.log(`Connection to ${DB_HOST}/${DB_NAME} opened`);
  })
  .catch((err) => {
    console.log("Error connecting to mongo: ", err);
  });

app.use("/users", userRouter);

module.exports = app;

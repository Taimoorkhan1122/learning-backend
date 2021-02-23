const express = require("express");
const JWT = require("jsonwebtoken");
const chalk = require("chalk");

const { UserModel } = require("../models");

const app = express();

// ===== Log formatting setting =====
const setError = chalk.red.bold;
const setMessage = chalk.blue.bold;
const setStatus = chalk.green.bold;

// Auth middleware
module.exports = app.use(async (req, res, next) => {
  console.log("auth triggered");
  const token = req.header("x-auth-token");

  const SECRET = process.env.secret;

  if (!token) {
    console.log(
      setStatus(`=> ${req.baseUrl}\n`),
      setError(token),
      setMessage("token not provided")
    );
    return res
      .status(400)
      .send({ success: false, messgae: "please provide valid token" });
  }

  try {
    const decoded = JWT.verify(token, SECRET);

    // verifying if signed in user is in our database
    const user = await UserModel.findOne({ _id: decoded.id });
    if (!user) {
      res.status(404).send({
        success: false,
        messgae: "user does not exist",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error(setError("error at Auth Middleware ") + error);
    res.status(401).send({ success: false, message: "token is not valid" });
  }
});

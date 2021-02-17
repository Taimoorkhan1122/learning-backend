const express = require("express");
const chalk = require("chalk");

const { UserModel } = require("../models");

const app = express();

// ===== Utilities =====
const setError = chalk.red.bold;
const setMessage = chalk.blue.bold;
const setStatus = chalk.green.bold;

// Auth middleware
module.exports = app.use(async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const [user] = await UserModel.find({ username }, { password: 0 });
    const foundKey = Object.keys(user.toObject());
    const userKey = ["username"];
    const isRegistered = userKey.every((key) => foundKey.includes(key));
    // check if request is from regestered user or not
    if (!isRegistered) {
      console.log(
        setError("user not regestered: ") + setMessage("respoding with 404")
      );
      return res
        .status(404)
        .send({ success: false, message: "You must signup first" });
    }
    next();
  } catch (error) {
    console.error(setError("error at Auth Middleware ") + error);
  }
});

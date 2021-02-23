const express = require("express");
const chalk = require("chalk");

const { UserModel } = require("../models");

const app = express();

// ===== Log formatting setting =====
const setError = chalk.red.bold;
const setMessage = chalk.blue.bold;
const setStatus = chalk.green.bold;

// Auth middleware
module.exports = app.use(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ success: false, message: "username and password is required" });
  }

  try {
    const [user] = await UserModel.find({ username });
    // if user is not found in database then return the response with not found
    // and if user found proceed to the route
    if (user) {
      next();
    } else {
      // log
      console.log(
        `=> got request for: ${req.baseUrl}\n`,
        setError("user not found\n"),
        setMessage("responding with 404")
      );
      // response
      return res.status(404).send({
        sucess: false,
        message: "user not found, You must signup first",
      });
    }
  } catch (error) {
    console.error(setError("error at Auth Middleware ") + error);
  }
});

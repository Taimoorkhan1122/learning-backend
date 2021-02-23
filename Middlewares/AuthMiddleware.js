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

  try {
    console.log("auth middleware working");
    next();
  } catch (error) {
    console.error(setError("error at Auth Middleware ") + error);
  }
});

// importing modules
const express = require("express");
const { ConnectionBase } = require("mongoose");
const chalk = require("chalk");
require("dotenv").config({ path: "./.env" });

// importing internal modules

const router = require("./Routes");
const { connectDatabase } = require("./db");

const app = express();
const PORT = process.env.PORT || 3500;

// ===== Utilities =====
const setError = chalk.red.bold;
const setMessage = chalk.blue.bold;
const setStatus = chalk.green.bold;

console.clear();

connectDatabase();

// when  we get data, it will be parsed into json rather than ugly raw data
app.use(express.json({ extended: false }));

// ========= Application Routes =========
app.get("/", (req, res) => {
  return res.send({ success: true, message: "hello from express server" });
});

app.use("/api/v1", router);

// This middleware will handle unmatched routes
app.use((req, res) => {
  console.log(
    "Got request Method: ",
    setError(req.method),
    " For: " + setStatus(req.url),
    " \n" + setMessage("Responding with 400 NOT FOUND")
  );
  res.status(400).send("Request not found!");
});

// ========= Starting server =========
app.listen(PORT, () => {
  console.log(`Express running on port:${PORT}`);
});

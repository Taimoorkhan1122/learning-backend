// importing modules
const express = require("express");
const { ConnectionBase } = require("mongoose");
const chalk = require("chalk");
require("dotenv").config({ path: "./.env" });

// importing internal modules
const { connectDatabase } = require("./db");
const router = require("./Routes");

const app = express();
const PORT = process.env.PORT || 3500;
console.clear();

connectDatabase();

// when  we get data, it will be parsed into json rather than ugly raw data
app.use(express.json({ extended: false }));

// ========= Application Routes =========
app.get("/", (req, res) => {
  res.status(200).send("hello from express server");
});

// handling applications routes
app.use("/api/v1", router);

// This middleware will handle unmatched routes
app.use((req, res) => {
  console.log(
    "Got request Method: ",
    chalk.red.bold(req.method),
    " For: " + chalk.green.bold(req.url),
    " \n" + chalk.blue.bold("Responding with 400 NOT FOUND")
  );
  res.status(400).send("Request not found!");
});

// ========= Starting server =========
app.listen(PORT, () => {
  console.log(`Express running on port:${PORT}`);
});

// importing modules
const express = require("express");
const { ConnectionBase } = require("mongoose");

// importing internal modules
const { connectDatabase } = require("./db");
const router = require("./Routes");

const app = express();
const PORT = 3500;
console.clear();

connectDatabase();

// when  we get data, it will be parsed into json rather than ugly raw data
app.use(express.json({ extended: false }));

// logger middleware
// const logger = (req, res, next) => {
//   if (req.method !== "GET") {
//     console.log("Not found!");
//     res.status(404).json({ message: "Request not found!" });
//   }
//   next();
// };
// app.use(logger);

// ========= Application Routes =========
app.get("/", (req, res) => {
  res.status(200).send("hello from express server");
});

// Auth middleware
// function Auth(req, res, next) {
//   console.log("Auth middleware triggered");
//   res.name ? next() : res.status(400).send("You must login first!");
// }

// handling applications routes
app.use("/api/v1", router);

// We can use middleware to handle unmatched routes
app.use((req, res) => {
  console.log(
    "Got request Method: ",
    req.method,
    " For: " + req.url,
    " \nResponding with 400 NOT FOUND"
  );
  res.status(400).send("Request not found!");
});

// ========= Starting server =========
app.listen(PORT, () => {
  console.log(`Express running on port:${PORT}`);
});

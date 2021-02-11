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

// ========= Querry database or Insert data =========
//    inset data accepst an functions
const insertData = {
  _id: 5,
  title: "Wonder Woman",
  cast: ["actor 1", "actor 2", "actor 3"],
};

const findData = {
  _id: 5,
};
// rundb(undefined, findData).catch(console.dir);

// when  we get data, it will be parsed into json rather than ugly raw data
app.use(express.json({ extended: false }));

// logger middleware
const logger = (req, res, next) => {
  if (req.method !== "GET") {
    console.log("Not found!");
    res.status(404).json({ message: "Request not found!" });
  }
  res.name = "Taimoor";
  next();
};
app.use(logger);

// Dummy Data
const response = [
  { id: 1, data: { name: "Response no 01", port: PORT } },
  { id: 2, data: { name: "Respnose no 02", port: PORT } },
];

// ========= Application Routes =========
app.get("/", (req, res) => {
  res.status(200).send("hello from express server");
});

// Auth middleware
function Auth(req, res, next) {
  console.log("Auth middleware triggered");
  res.name ? next() : res.status(400).send("You must login first!");
}

// handling applications routes
app.use("/api/v1", Auth, router);

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

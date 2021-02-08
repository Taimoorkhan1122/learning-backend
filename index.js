const express = require("express");

const app = express();

const PORT = 3500;

console.clear();

// when data we get data so it will be parsed into json rather than ugly raw data
app.use(express.json({ extended: false }));

const logger = (req, res, next) => {
  if (req.method !== "GET") {
    console.log("Not found!");
    res.status(404).json({ message: "Request not found!" });
  }
  // res.name = "Taimoor";
  next();
};

app.use(logger);

// Dummy Data
const response = [
  { id: 1, data: { name: "Response no 01", port: PORT } },
  { id: 2, data: { name: "Respnose no 02", port: PORT } },
];

app.get("/", (req, res) => {
  res.status(200).send("hello from express");
});

app.get("/user1", Auth, (req, res) => {
  res.status(200).json(response[0]);
});

app.get("/user2", Auth, (req, res) => {
  res.status(200).json(response[1]);
});

function Auth(req, res, next) {
  console.log("Auth middleware triggered");
  res.name ? next() : res.status(400).send("You must login first!");
}

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

app.listen(PORT, () => {
  console.log(`Express running on port:${PORT}`);
});

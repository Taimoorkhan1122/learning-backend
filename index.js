const express = require("express");

const app = express();

const PORT = 3500;

console.clear();

const response = [
  { id: 1, data: { name: "express", port: PORT } },
  { id: 2, data: { name: "express", port: PORT } },
];
app.get("/", (req, res) => {
  res.status(200).send("hello from express");
});
app.get("/user1", (req, res) => {
  res.status(200).json(response[0]);
});
app.get("/user2", (req, res) => {
  res.status(200).json(response[1]);
});

app.use((req, res) => {
  console.log(
    "Got request for ",
    req.method,
    req.url,
    " Responding with 400 NOT FOUND"
  );
  res.status(400).send("Not a valid request");
});

app.listen(PORT, () => {
  console.log(`Express running on posrt:${PORT}`);
});

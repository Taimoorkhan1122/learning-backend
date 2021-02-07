const express = require("express");

const app = express();

const PORT = 3500;
app.get("/", (req, res) => {
  res.status(200).json({ name: "express", port: PORT });
});

app.listen(PORT, () => {
  console.log(`Express running on posrt:${PORT}`);
});

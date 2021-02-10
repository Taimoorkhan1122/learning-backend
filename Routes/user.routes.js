const express = require("express");
// we are using express router for handling router
const app = express();
const router = express.Router();

const users = [
  {
    id: 1,
    name: "taimoor khan",
  },
  { id: 2, name: "Mansoor khan" },
];

// /users route
router.get("/", (req, res) => {
  res.send("getting all users");
});

// /users/id route
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const foundUser = users.filter((user) => user.id === +id);
  console.log(foundUser);
  foundUser.length
    ? res.send(foundUser)
    : res.status(404).send("user not found");
  console.dir;
});

exports.userRoute = app.use("/users", router);

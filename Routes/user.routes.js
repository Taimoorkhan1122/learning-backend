const express = require("express");
const { getUsers } = require("../Controllers");
// we are using express router for handling router
const app = express();
const router = express.Router();

// /users route
router.get("/", getUsers.getUsersController);

const auth = (req, res, next) => {
  console.log("running post");
  next();
};
// route for singup
router.post("/signup", auth, getUsers.userSignUp);

router.post("/", auth, (req, res) => {
  res.status(404).send("request not found again");
});

// /users/id route
// router.get("/:id", getUsers.getUsersByID);

exports.userRoute = app.use("/users", router);

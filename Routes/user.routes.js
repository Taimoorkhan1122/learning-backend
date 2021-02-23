const express = require("express");
const { getUsers } = require("../Controllers");
const { Auth } = require("../Middlewares");
// we are using express router for handling router
const app = express();
const router = express.Router();

// =====  GET Route =====
// router.get("/", getUsers.getUsersController);

router.get("/user", getUsers.getUsersController);

// ===== POST Routes =====
router.post("/signup", getUsers.userSignUp);

router.post("/signin", Auth, getUsers.userSignIn);

router.post("/", (req, res) => {
  res.status(404).send("request not found again");
});

exports.userRoute = app.use("/users", router);

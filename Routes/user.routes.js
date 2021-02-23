const { ObjectID } = require("bson");
const express = require("express");
const { userControllers } = require("../Controllers");
const { Auth } = require("../Middlewares");
// we are using express router for handling router
const app = express();
const router = express.Router();

// =====  GET Route =====
// router.get("/", getUsers.getUsersController);

router.get("/:id", userControllers.getByIdController);

// ===== POST Routes =====
router.post("/signup", userControllers.userSignUp);

router.post("/signin", Auth, userControllers.userSignIn);

router.post("/", (req, res) => {
  res.status(404).send("request not found");
});

exports.userRoute = app.use("/users", router);

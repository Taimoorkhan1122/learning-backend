const express = require("express");
const { getUsers } = require("../Controllers");
// we are using express router for handling router
const app = express();
const router = express.Router();

// /users route
router.get("/", getUsers.getUsersController);

// /users/id route
router.get("/:id", getUsers.getUsersByID);

exports.userRoute = app.use("/users", router);

const express = require("express");
const { todosController } = require("../Controllers");

// we are using express router for handling router
const app = express();

const router = express.Router();

// /todos route
router.get("/", todosController.todosController);

// /users/id route
router.get("/:id", todosController.getTodosByID);

exports.todoRoute = app.use("/todos", router);

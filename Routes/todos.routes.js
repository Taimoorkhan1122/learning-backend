const express = require("express");
const { getTodos } = require("../Controllers");

// we are using express router for handling router
const app = express();

const router = express.Router();

// /todos route
router.get("/", getTodos.todosController);

// /users/id route
router.get("/:id", getTodos.getTodosByID);

exports.todoRoute = app.use("/todos", router);

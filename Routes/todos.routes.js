const express = require("express");

const { todosController } = require("../Controllers");
const { Auth } = require("../Middlewares");
// we are using express router for handling router
const app = express();

const router = express.Router();

// /todos route
router.get("/", Auth, todosController.getTodos);

// /users/id route
router.get("/:id", todosController.getTodosByID);

// create new todo
router.post("/create", Auth, todosController.createTodo);

// delete new todo
router.delete("/delete/:id", Auth, todosController.deletetodo);

exports.todoRoute = app.use("/todos", router);

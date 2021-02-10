const { todosController, getTodosController } = require("./todos.controller");
const { getUsersController, getUsersByID } = require("./users.controller");

exports.getTodos = { todosController, getTodosController };
exports.getUsers = { getUsersController, getUsersByID };

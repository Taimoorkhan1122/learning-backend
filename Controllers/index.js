const { todosController, getTodosByID } = require("./todos.controller");
const { getUsersController, getUsersByID } = require("./users.controller");

exports.getTodos = { todosController, getTodosByID };
exports.getUsers = { getUsersController, getUsersByID };

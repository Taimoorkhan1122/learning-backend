const { todosController, getTodosByID } = require("./todos.controller");
const { getUsersController, userSignUp } = require("./users.controller");

exports.getTodos = { todosController, getTodosByID };
exports.getUsers = { getUsersController, userSignUp };

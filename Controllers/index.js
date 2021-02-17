const { todosController, getTodosByID } = require("./todos.controller");
const {
  getUsersController,
  userSignUp,
  userSignIn,
} = require("./users.controller");

exports.getTodos = { todosController, getTodosByID };
exports.getUsers = { getUsersController, userSignUp, userSignIn };

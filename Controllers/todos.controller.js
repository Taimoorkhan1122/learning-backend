const todos = [
  {
    id: 1,
    task: "do something",
  },
  { id: 2, task: "again do something" },
  { id: 3, task: "again do something" },
];

exports.todosController = (req, res) => {
  res.send(todos);
};

exports.getTodosByID = (req, res) => {
  const id = req.params.id;
  const foundTodos = todos.filter((todo) => todo.id === +id);
  console.log(foundTodos);
  foundTodos.length
    ? res.send(foundTodos)
    : res.status(404).send("No todos found");
  console.dir;
};

const users = [
  {
    id: 1,
    name: "taimoor khan",
  },
  { id: 2, name: "Mansoor khan" },
];

exports.getUsersController = (req, res) => {
  res.send("getting all users");
};

exports.getUsersByID = (req, res) => {
  const id = req.params.id;
  const foundUser = users.filter((user) => user.id === +id);
  console.log(foundUser);
  foundUser.length
    ? res.send(foundUser)
    : res.status(404).send("user not found");
  console.dir;
};

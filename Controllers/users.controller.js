const bcrypt = require("bcrypt");

const { UserModel } = require("../models");

exports.getUsersController = (req, res) => {
  res.send("getting all users");
};

// singup user
exports.userSignUp = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  if (!username || !password) {
    return res
      .status(400)
      .send({ success: false, message: "username and password is required" });
  }

  try {
    const user = await UserModel.findOne({ username });

    // checking if user already exist
    if (user) {
      return res
        .status(400)
        .send({ success: false, message: "username already exist" });
    }
    // encrpting user passowrd using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await UserModel.create({
      username,
      password: hashedPassword,
    });

    createdUser.save();
    res.send({
      success: true,
      message: "user created succesfully",
      username: createdUser.username,
    });
  } catch (error) {
    console.error(`Error from users.controller.js: ${error.message}`);
  }
};

// exports.getUsersByID = (req, res) => {
//   const id = req.params.id;
//   const foundUser = users.filter((user) => user.id === +id);
//   console.log(foundUser);
//   foundUser.length
//     ? res.send(foundUser)
//     : res.status(404).send("user not found");
//   console.dir;
// };

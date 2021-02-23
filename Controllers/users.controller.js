const bcrypt = require("bcrypt");
const chalk = require("chalk");

const { UserModel } = require("../models");

// ===== Utilities =====
const setError = chalk.red.bold;
const setMessage = chalk.blue.bold;
const setStatus = chalk.green.bold;

exports.getUsersController = async (req, res) => {
  const user = await UserModel.find({}, { password: 0 });
  res.status(200).send({ success: true, Message: "getting all users: ", user });
};

// ====== singup user ======
exports.userSignUp = async (req, res) => {
  const { username, password } = req.body;

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
    console.error(
      setError(
        `Error from users.controller.js signup: ${setMessage(error.message)}`
      )
    );
  }
};

// ====== singin user ======
exports.userSignIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    // compare password
    const matched = await bcrypt.compare(password, user.password);

    if (matched) {
      return res.send({ success: true, messgae: "got sigin request" });
    } else {
      // log
      console.error(
        setError(
          `Error from users.controller.js signin: ${setMessage(
            "password not matched"
          )}`
        )
      );
      // response
      return res.send({ success: false, messgae: "password not matched" });
    }
  } catch (error) {
    console.error(
      setError(
        `Error from users.controller.js signin: ${setMessage(error.message)}`
      )
    );
  }
};

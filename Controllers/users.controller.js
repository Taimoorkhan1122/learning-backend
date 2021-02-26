const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { ObjectID } = require("mongoose").Types.ObjectId;
const chalk = require("chalk");

const { UserModel } = require("../models");

// ===== Utilities =====
const setError = chalk.red.bold;
const setMessage = chalk.blue.bold;
const setStatus = chalk.green.bold;

// ====== getting user ======
// @url: api/v1/users
exports.getUsersController = async (req, res) => {
  const user = await UserModel.find({}, { password: 0 });
  res.status(200).send({ success: true, Message: "getting all users: ", user });
};

// ====== get user by ID ======
exports.getByIdController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .send({ success: false, message: "Please provide user ID" });
  }
  if (!ObjectID.isValid(id)) {
    return res
      .status(400)
      .send({ success: false, message: "Please provide a valid user ID" });
  }
  try {
    const user = await UserModel.findById({ _id: id }).select("-password");
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "user not found" });
    }
    if (user.username !== req.user.username) {
      return res
        .status(401)
        .send({ success: false, message: "Access not allowed" });
    }
    return res.send({ success: true, user });
  } catch (error) {
    console.error(
      setError(
        `Error from users.controller.js getByIdController: ${setMessage(error)}`
      )
    );
    res.status(500).send({ message: "internal server error" });
  }
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
    res.status(500).send({ message: "internal server error" });
  }
};

// ====== singin user ======
exports.userSignIn = async (req, res) => {
  const SECRET = process.env.SECRET;
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ success: false, message: "username and password is required" });
  }

  try {
    const user = await UserModel.findOne({ username });
    // check if user exist in DB or not
    if (!user) {
      // log
      console.log(
        `=> got request for: ${req.baseUrl}\n`,
        setError("user not found\n"),
        setMessage("responding with 404")
      );
      // response
      return res.status(404).send({
        sucess: false,
        message: "user not found, You must signup first",
      });
    }

    // compare password
    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      console.error(
        setError(
          `Error from users.controller.js signin: ${setMessage(
            "password not matched"
          )}`
        )
      );
      return res
        .status(404)
        .send({ success: false, messgae: "please provide valid credentials" });
    }
    const payload = {
      username: user.username,
      id: user._id,
    };
    const token = JWT.sign(payload, SECRET, {
      expiresIn: "1h",
    });
    res.send({
      success: true,
      message: " Login sucessful",
      token,
      user_id: user._id,
    });
  } catch (error) {
    console.error(
      setError(
        `Error from users.controller.js signin: ${setMessage(error.message)}`
      )
    );
    res.status(500).send({ message: "internal server error" });
  }
};

/*
SQL         |       NoSQL
database    |       database
table       |       Collection
entry       |       document

Scheam => defines the structure of data our document will contain
*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
  },
  { timestamps: true }
);

exports.UserModel = mongoose.model("user", UserSchema);

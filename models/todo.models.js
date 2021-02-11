/*
SQL         |       NoSQL
database    |       database
table       |       Collection
entry       |       document

Scheam => defines the structure of data our document will contain
*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    // creating connection between databases
    createdBy: {
      // setting type of created by to userid given by monogodb
      type: Schema.Types.ObjectId,
      // giving refrence to where to find the above ID
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

exports.TodosModel = mongoose.model("todo", TodoSchema);

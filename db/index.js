const mongoose = require("mongoose");

exports.connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/myTestDB", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log("database connection successful");
  } catch (error) {
    console.error("errror connecting database at index.js");
  }
};

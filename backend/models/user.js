const mongoose = require("mongoose");

//Define User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "user",
  }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  accessToken: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

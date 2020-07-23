const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
  },
  favList: {
    type: Array,

    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);

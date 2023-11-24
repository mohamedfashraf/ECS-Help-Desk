const mongoose = require("mongoose");
const userModelSchema = require("./usersModelSchema");

const userSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModelSchema",
    required: true,
  },
  token: {
    type: String,
    requied: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const UserSession = mongoose.model("UserSession", userSessionSchema);

module.exports = UserSession;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: [String],
    enum: ["user", "admin", "agent", "manager"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.isOAuthUser; // Only require password if it's not an OAuth user
    }
  },
  isOAuthUser: {
    type: Boolean,
    default: false
  },

  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },

  twoFactorAuthEnabled: {
    type: Boolean,
    default: false,
  },
  twoFactorAuthSecret: {
    type: String,
    default: "",
  },
  isBackupEnabled: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

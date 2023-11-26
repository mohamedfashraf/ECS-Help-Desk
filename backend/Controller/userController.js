const userModel = require("../Models/usersModelSchema");

const bcrypt = require("bcrypt");
const sessionModel = require("../Models/sessionModel");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const secretKey =process.env.SECRET_KEY ;
async function createUser(req, res) {
  try {
    const { name, role, email, password } = req.body;
    // Hashing the password
    const salt = await bcrypt.genSalt(10); // 10 rounds of salting
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, role, email, password: hashedPassword });
    await user.save();

    // Optionally, you might want to remove or modify the response to not include sensitive data
    const userResponse = user.toObject();
    delete userResponse.password; // Removing password from the response

    res.status(201).send(userResponse);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateUser(req, res) {
  try {
    const updates = Object.keys(req.body);
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

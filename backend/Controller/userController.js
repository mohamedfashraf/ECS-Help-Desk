const UserModel  = require("../Models/usersModelSchema");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;
async function register(req, res) {
  try {
    const { name, role, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);


    const user = new UserModel({ name, role, email, password: hashedPassword });
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).send(userResponse);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "email not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(405).json({ message: "incorrect password" });
    }

    const currentDateTime = new Date();
    const expiresAt = new Date(currentDateTime.getTime() + 1800000); 

    const token = jwt.sign(
      { user: { userId: user._id, role: user.role } },
      secretKey,
      { expiresIn: '30m' } 
    );

    return res
      .cookie("token", token, {
        expires: expiresAt,
        httpOnly: false, 
        SameSite: 'None', 
        secure: false 
      })
      .status(200)
      .json({ message: "login successfully", user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

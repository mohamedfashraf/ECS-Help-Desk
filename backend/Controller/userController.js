const SupportAgentModel = require("../Models/supportAgentModelSchema");
const UserModel = require("../Models/usersModelSchema");
const jwt = require("jsonwebtoken");
const { DateTime } = require('luxon');
const agentModel = require("../Models/supportAgentModelSchema");

const bcrypt = require("bcrypt");
require("dotenv").config();

const secretKey = "s1234rf,.lp";

async function adminRegister(req, res) {
  try {
    const { name, email, role, password, specialization, assignedTickets } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (role == "agent") {
      const agent = new agentModel({ name, email, role, password: hashedPassword, specialization, assignedTickets });
      await agent.save();
      const user = new UserModel({ name, role, email, password: hashedPassword });
      await user.save();

      const agentResponse = agent.toObject();
      delete agentResponse.password;
      const userResponse = user.toObject();
      delete userResponse.password;
      res.status(201).send(agentResponse);
    } else {
      const user = new UserModel({ name, role, email, password: hashedPassword });
      await user.save();

      const userResponse = user.toObject();
      delete userResponse.password;
      res.status(201).send(userResponse);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const role = "user";
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

async function createUser(req, res) {
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
    const expiresAt = new Date(currentDateTime.getTime() + 9e6);


    const token = jwt.sign(
      { user: { userId: user._id, role: user.role } },
      secretKey,
      { expiresIn: "30m" }
    );

    return res
      .cookie("token", token, {
        expires: expiresAt,
        httpOnly: false,
        SameSite: "None",
        secure: false,
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
    const users = await UserModel.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getUserById(req, res) {
  try {
    const user = await UserModel.findById(req.params.id);
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
    const user = await UserModel.findById(req.params.id);
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
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
//
//

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  adminRegister
};

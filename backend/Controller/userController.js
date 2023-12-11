const UserModel = require("../Models/usersModelSchema");
const jwt = require("jsonwebtoken");
const agentModel = require("../Models/supportAgentModelSchema");
const validator = require("validator");

const bcrypt = require("bcrypt");
require("dotenv").config();

const secretKey = "s1234rf,.lp";

async function adminRegister(req, res) {
  try {
    const { name, email, role, password, specialization, assignedTickets } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = req.user.role;
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

    let userTest = await UserModel.findOne({ email });
    if (userTest) {
      return res
        .status(400).json({ message: "email already exists.." });
    }
    const role = "user";
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Must be vaild email.." });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Must be strong password.." });
      // a strong password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character

    }

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
      return res.status(404).json({ message: "Email not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Create a token
    const token = jwt.sign(
      { userId: user._id, role: user.role, name: user.name, email: user.email },
      secretKey,
      { expiresIn: "30m" } // Token expires in 30 minutes
    );

    // Calculate expiration time for the cookie
    const currentDateTime = new Date();
    const expiresAt = new Date(currentDateTime.getTime() + 9e6); // 9e6 milliseconds = 2.5 hours

    // Set token in a cookie
    res.cookie("token", token, {
      expires: expiresAt,
      httpOnly: false, // Consider setting to true for security
      sameSite: "None", // Adjust based on your requirements
      secure: false, // Set to true if using HTTPS
    });

    // Include the token in the JSON response
    return res.status(200).json({
      message: "Login successfully",
      user,
      token, // Send the token here
    });
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

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  adminRegister
};

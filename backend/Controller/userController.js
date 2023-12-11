const SupportAgentModel = require("../Models/supportAgentModelSchema");
const UserModel = require("../Models/usersModelSchema");
const jwt = require("jsonwebtoken");
const { DateTime } = require("luxon");
const agentModel = require("../Models/supportAgentModelSchema");
const otplib = require("otplib");
const { authenticator } = otplib;
const bcrypt = require("bcrypt");
const qrcode = require("qrcode");

require("dotenv").config();

const secretKey = "s1234rf,.lp";

async function adminRegister(req, res) {
  try {
    const { name, email, role, password, specialization, assignedTickets } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (role == "agent") {
      const agent = new agentModel({
        name,
        email,
        role,
        password: hashedPassword,
        specialization,
        assignedTickets,
      });
      await agent.save();
      const user = new UserModel({
        name,
        role,
        email,
        password: hashedPassword,
      });
      await user.save();

      const agentResponse = agent.toObject();
      delete agentResponse.password;
      const userResponse = user.toObject();
      delete userResponse.password;
      res.status(201).send(agentResponse);
    } else {
      const user = new UserModel({
        name,
        role,
        email,
        password: hashedPassword,
      });
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
    const { email, password, userEnteredToken } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(405).json({ message: "Incorrect password" });
    }

    const is2FAValid = await isValid2FA(user, userEnteredToken);
    if (!is2FAValid) {
      return res.status(401).json({ message: "Invalid 2FA token" });
    }
    const currentDateTime = new Date();
    const expiresAt = new Date(currentDateTime.getTime() + 9e6);

    const token = jwt.sign(
      {
        user: {
          userId: user._id,
          role: user.role,
          name: user.name,
          email: user.email,
        },
      },
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
      .json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
async function isValid2FA(user, token) {
  if (user.twoFactorAuthEnabled) {
    const isValid = authenticator.verify({
      secret: user.twoFactorAuthSecret,
      token,
    });

    return isValid;
  }

  return true; // 2FA is not enabled, no need to validate
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

async function enable2FA(req, res) {
  try {
    const { userId } = req.user;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.twoFactorAuthEnabled) {
      return res
        .status(400)
        .json({ message: "2FA is already enabled for this user" });
    }

    // Generate a new 2FA secret for the user
    const secret = authenticator.generateSecret();
    const otpauthURL = authenticator.keyuri(user.email, "YourAppName", secret);

    // Generate QR code for the OTP auth URL
    const qrCodeURL = await generateQRCode(otpauthURL);

    // Update the user with the 2FA secret and mark it as enabled
    user.twoFactorAuthSecret = secret;
    user.twoFactorAuthEnabled = true;
    await user.save();

    // Return the OTP auth URL and QR code URL to the client
    res.status(200).json({ otpauthURL, qrCodeURL });
  } catch (error) {
    console.error("Error enabling 2FA:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function generateQRCode(data) {
  try {
    const qrCode = await qrcode.toDataURL(data);
    return qrCode;
  } catch (error) {
    throw new Error("Error generating QR code");
  }
}

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  adminRegister,
  enable2FA,
};

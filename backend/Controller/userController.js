const UserModel = require("../Models/usersModelSchema");
const jwt = require("jsonwebtoken");
const agentModel = require("../Models/supportAgentModelSchema");
const validator = require("validator");
const mongoose = require("mongoose");
const secretKey = "s1234rf,.lp";

const otplib = require("otplib");
const { authenticator } = otplib;
const bcrypt = require("bcrypt");
const qrcode = require("qrcode");
const logger = require('../Controller/loggerController'); // Adjust the path accordingly


require("dotenv").config();

const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const Dropbox = require('dropbox').Dropbox;

const dropboxToken = 'sl.BsatRBgkfsNK15maKWKuDb2rVCExI7yX-VBHxGkweOyL9GeP2TO6rXIpalVewktufleovgEQZHp1kcuwDE1YamPpyP8BMEwAsZ6LLHL-J2opUPjsIMsi4hj-yGxoU9IjXuTwFHgAwIj5IPXkXMZp';
const dropbox = new Dropbox({ accessToken: dropboxToken });

async function uploadFolderToDropbox(folderPath, dropboxFolderPath = "") {
  try {
    // List all items (files and directories) in the folder
    const items = fs.readdirSync(folderPath, { withFileTypes: true });

    // Iterate through each item
    for (const item of items) {
      const itemPath = `${folderPath}/${item.name}`;
      const dropboxItemPath = `${dropboxFolderPath}/${item.name}`;

      if (item.isFile()) {
        const filePath = `${folderPath}/${item.name}`;
        const fileContent = fs.readFileSync(filePath);

        // Specify the file path in Dropbox
        const dropboxPath = `/ECS-help-desk/backup/${item.name}`;

        try {
          // Upload the file to Dropbox
          const response = await dbx.filesUpload({ path: dropboxPath, contents: fileContent });
          console.log('File uploaded to Dropbox:', response);
        } catch (uploadError) {
          logger.error(`Error uploading filer to Dropbox: ${error.message}`);

          console.error(`Error uploading file to Dropbox:`, uploadError);
        }

      }
    }

    console.log(`Folder uploaded to Dropbox: ${dropboxFolderPath}`);
  } catch (error) {
    logger.error(`Error uploading folder to Dropbox: ${error.message}`);

    console.error(`Error uploading folder to Dropbox: ${error.message}`);
  }
}

const performBackup = async (user) => {
  if (user) {
    if (user.isBackupEnabled) {
      const backupFolder = 'C:/Users/moham/OneDrive/Desktop/backups';
      const timestamp = new Date().toISOString().replace(/[-:]/g, '');
      const mongoURI = 'mongodb://127.0.0.1:27017/SE-Project';

      const backupPath = `${backupFolder}/${timestamp}`;
      const mongodumpCommand = `"C:\\Program Files\\MongoDB\\Tools\\100\\bin\\mongodump" --uri=${mongoURI} --out=${backupPath} --db=SE-Project`;

      try {
        // Execute mongodump command
        await exec(mongodumpCommand);
        console.log(`Backup successful: ${backupPath}`);

        // Upload the backup to Dropbox
        await uploadFolderToDropbox("C:/Users/moham/OneDrive/Desktop/backups");
      } catch (error) {
        logger.error(`Error during backup: ${error.message}`);

        console.error(`Error during backup: ${error.message}`);
      }
    } else {
      logger.error(`Backup not initiated. User backup is not enabled.: ${error.message}`);

      console.log("Backup not initiated. User backup is not enabled.");
    }
  } else {
    logger.error(`Backup not initiated. User not logged in.: ${error.message}`);

    console.log("Backup not initiated. User not logged in.");

  }
};

async function adminRegister(req, res) {
  try {
    const { name, email, role, password, expertise } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = req.user.role;
    const newId = new mongoose.Types.ObjectId();

    if (role == "agent") {
      const agent = new agentModel({
        _id: newId,
        name,
        email,
        role,
        password: hashedPassword,
        expertise,
      });
      await agent.save();
      const user = new UserModel({
        _id: newId,
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
    logger.error(`Error.: ${error.message}`);

    res.status(400).send(error.message);
  }
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    let userTest = await UserModel.findOne({ email });
    if (userTest) {
      return res.status(400).json({ message: "email already exists.." });
    }
    const role = "user";
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Must be valid email.." });
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
    logger.error(`Error.: ${error.message}`);

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
      logger.error(`Error in someFunction: ${error.message}`);

      
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Check if MFA is enabled for the user
    if (user.twoFactorAuthEnabled) {
      // If MFA is enabled, just notify the client
      return res.status(200).json({
        message: "MFA required",
        userId: user._id, // send user ID for the next step
      });
    }

    // Create a token
    const token = jwt.sign(
      { userId: user._id, role: user.role, name: user.name, email: user.email },
      secretKey,
      { expiresIn: "2.5h" } // Token expires in 2.5 hours
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
    logger.error(`Error in someFunction: ${error.message}`);

    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function verifyMFA(req, res) {
  try {
    const { userId, mfaToken } = req.body;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidToken = authenticator.verify({
      secret: user.twoFactorAuthSecret,
      token: mfaToken,
    });

    if (!isValidToken) {
      return res.status(401).json({ message: "Invalid MFA token" });
    }

    // Create a full-access token
    const token = jwt.sign(
      { userId: user._id, role: user.role, name: user.name, email: user.email },
      secretKey,
      { expiresIn: "2.5h" } // Token expires in 2.5 hours
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
    logger.error(`Error logging in: ${error.message}`);

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
    logger.error(`Error: ${error.message}`);

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
    logger.error(`Error: ${error.message}`);

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
    logger.error(`Error: ${error.message}`);

    res.status(400).send(error.message);
  }
}

// Update user by ID
async function updateById(req, res) {
  try {
    const userId = req.params.id;
    const updates = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    Object.keys(updates).forEach((key) => {
      user[key] = updates[key];
    });

    // Save the updated user
    const updatedUser = await user.save();

    // Respond with the updated user
    res.status(200).json(updatedUser);
  } catch (error) {
    logger.error(` ServerError: ${error.message}`);

    res.status(500).json({ message: "Server error", error: error.message });
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
    logger.error(`Error: ${error.message}`);

    res.status(500).send(error.message);
  }
}

async function enable2FA(req, res) {
  try {
    // Extract token from cookies
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Access denied. No authorization header provided." });
    }

    // Typically, the Authorization header is in the format: "Bearer [token]"
    const token = authHeader.split(" ")[1]; // Splitting by space and taking the second part (the token itself)
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    // Verify token and extract user ID
    let userId;
    try {
      const decoded = jwt.verify(token, secretKey);
      userId = decoded.userId;
    } catch (error) {
      logger.error(`Error: Invalid Token: ${error.message}`);

      return res.status(403).json({ message: "Invalid token" });
    }

    // Find user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      logger.error(`Error:User not found ${error.message}`);

      return res.status(404).json({ message: "User not found" });
    }

    // Generate a new 2FA secret for the user
    const secret = authenticator.generateSecret();
    const otpauthURL = authenticator.keyuri(user.email, "ECS-MFA", secret);

    // Generate QR code for the OTP auth URL
    const qrCodeURL = await generateQRCode(otpauthURL);

    // Update the user with the 2FA secret and mark it as enabled
    user.twoFactorAuthSecret = secret;
    await user.save();

    res.status(200).json({ otpauthURL, qrCodeURL });
  } catch (error) {
    
    logger.error(`Error Enabling 2FA: ${error.message}`);

    console.error("Error enabling 2FA:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function generateQRCode(data) {
  try {
    return await qrcode.toDataURL(data);
  } catch (error) {
    logger.error(`Error genretaying QR code: ${error.message}`);

    throw new Error("Error generating QR code");
  }
}

const verifyTwoFactorAuth = async (req, res) => {
  try {
    // Check if the Authorization header is present
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "No authorization header provided" });
    }

    // Decode the JWT token to get the user ID
    const token = authHeader.split(" ")[1]; // Assuming token format is "Bearer [token]"
    if (!token) {
      logger.error(`No token provided: ${error.message}`);

      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;

    // Extract 2FA token from the request body
    const { twoFactorAuthToken } = req.body;

    // Find the user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      logger.error(`Error:User not found. ${error.message}`);

      return res.status(404).json({ message: "User not found" });
    }

    // Verify the 2FA token
    const isTokenValid = authenticator.verify({
      token: twoFactorAuthToken,
      secret: user.twoFactorAuthSecret,
    });

    if (!isTokenValid) {
      logger.error(`Invalid 2FA token: ${error.message}`);

      return res.status(400).json({ message: "Invalid 2FA token" });

    }

    // If token is valid, enable 2FA for the user
    user.twoFactorAuthEnabled = true;
    await user.save();

    // Token is valid, proceed with the intended action
    res.status(200).json({ message: "2FA token verified successfully" });
  } catch (error) {
    logger.error(`Error Verifying 2FA token: ${error.message}`);

    console.error("Error verifying 2FA token:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

async function check2FAStatus(req, res) {
  try {
    // Extract and verify token, similar to the enable2FA function
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;

    // Find user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      logger.error(`User not found: ${error.message}`);

      return res.status(404).json({ message: "User not found" });
    }

    // Return the status of 2FA for the user
    res.status(200).json({ is2FAEnabled: user.twoFactorAuthEnabled });
  } catch (error) {
    logger.error(`Error checking 2FA status: ${error.message}`);

    console.error("Error checking 2FA status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function disableMFA(req, res) {
  try {
    // Verify the JWT token and extract user ID
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretKey); // Use your JWT secret key
    const userId = decoded.userId;

    // Find the user in the database
    const user = await UserModel.findById(userId);
    if (!user) {
      logger.error(`User not found: ${error.message}`);

      return res.status(404).json({ message: "User not found." });
    }

    // Check if MFA is already disabled
    if (!user.twoFactorAuthEnabled) {
      logger.error(`MFA is already disabled: ${error.message}`);

      return res.status(400).json({ message: "MFA is already disabled." });
    }

    // Update the user's record to disable MFA
    user.twoFactorAuthEnabled = false;
    user.twoFactorAuthSecret = ""; // Clear any 2FA secret if stored
    await user.save();

    res.status(200).json({ message: "MFA disabled successfully." });
  } catch (error) {
    logger.error(`Erro disabling MFA: ${error.message}`);

    console.error("Error disabling MFA:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// async function updateMFAStatus(req, res) {
//   try {
//     const userId = await UserModel.findById(req.params._id);
//     const { mfaEnabled } = req.body;

//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.mfaEnabled = mfaEnabled;
//     await user.save();

//     res.status(200).json({ message: "MFA status updated successfully" });
//   } catch (error) {
//     console.error("Error updating MFA status:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// }
const setBackupStatus = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { isBackupEnabled } = req.body;

    // Find the user by ID and update the isBackupEnabled field
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { isBackupEnabled } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If backup is enabled, schedule a backup every minute
    if (isBackupEnabled) {
      // Initial backup
      performBackup(user);

      // Schedule subsequent backups every 1 minute
      const backupInterval = setInterval(() => {
        performBackup(user);
      }, 60 * 1000); // 60 seconds * 1000 milliseconds

      // Store the interval ID in the user object (to clear it later if needed)
      user.backupInterval = backupInterval;
    } else {
      // If backup is disabled, clear the scheduled interval (if it exists)
      if (user.backupInterval) {
        clearInterval(user.backupInterval);
        user.backupInterval = null; // Set it to null after clearing
      }
    }

    res.status(200).json({ message: "Backup status updated successfully" });
  } catch (error) {
    logger.error(`Error updating status: ${error.message}`);

    console.error("Error updating backup status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



module.exports = enable2FA;

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  adminRegister,
  enable2FA,
  verifyTwoFactorAuth,
  check2FAStatus,
  updateById,
  disableMFA,
  verifyMFA,
  //updateMFAStatus
  setBackupStatus,
};

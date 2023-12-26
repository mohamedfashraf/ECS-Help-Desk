const logger = require('../Controller/loggerController'); // Adjust the path accordingly
const mongoose = require("mongoose");
const SecuritySettings = require("../Models/securitySettingsModelSchema");
const User = require("../Models/usersModelSchema"); // Adjust the path based on your actual user model location
const otplib = require('otplib');
const { authenticator } = otplib;

// Create new security settings with 2FA
async function createSecuritySettings(req, res) {
  try {
    const {
      sensitive_data_protection,
      data_backup_enabled,
      recovery_procedures,
      MFA_enabled,
    } = req.body;
    const user_id = req.user.userId; // Adjusted to match the token structure

    // Check if the user wants to enable 2FA
    if (MFA_enabled) {
      // Generate and store a new 2FA secret for the user
      const secret = speakeasy.generateSecret({ length: 20 });
      const encodedSecret = secret.base32;

      // Save the encodedSecret in the user model's field (e.g., twoFactorAuthSecret)
      await User.findByIdAndUpdate(user_id, {
        $set: {
          twoFactorAuthSecret: encodedSecret,
          twoFactorAuthEnabled: true,
        },
      });
    }

    const securitySettings = new SecuritySettings({
      user_id,
      sensitive_data_protection,
      data_backup_enabled,
      recovery_procedures,
      MFA_enabled,
    });

    await securitySettings.save();

    logger.info('Security settings created successfully');
    res.status(201).json(securitySettings);
  } catch (error) {
    logger.error(`Error creating security settings: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
}

// Get all security settings
async function getAllSecuritySettings(req, res) {
  try {
    const securitySettings = await SecuritySettings.find();
    logger.info('Retrieved all security settings successfully');
    res.status(200).json(securitySettings);
  } catch (error) {
    logger.error(`Error retrieving all security settings: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}

// Get specific security setting by ID
async function getSecuritySettingById(req, res) {
  try {
    const securitySetting = await SecuritySettings.findById(req.params.id);
    if (!securitySetting) {
      logger.warn('Security setting not found');
      return res.status(404).json({ error: "Security setting not found" });
    }
    logger.info('Retrieved security setting by ID successfully');
    res.status(200).json(securitySetting);
  } catch (error) {
    logger.error(`Error retrieving security setting by ID: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}

// Update a security setting by ID
async function updateSecuritySetting(req, res) {
  try {
    const updates = Object.keys(req.body);
    const securitySetting = await SecuritySettings.findById(req.params.id);
    if (!securitySetting) {
      logger.warn('Security setting not found for updating');
      return res.status(404).json({ error: "Security setting not found" });
    }
    updates.forEach((update) => (securitySetting[update] = req.body[update]));
    await securitySetting.save();
    logger.info('Security setting updated successfully');
    res.status(200).json(securitySetting);
  } catch (error) {
    logger.error(`Error updating security setting: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
}

// Delete a security setting by ID
async function deleteSecuritySetting(req, res) {
  try {
    const securitySetting = await SecuritySettings.findByIdAndDelete(
      req.params.id
    );
    if (!securitySetting) {
      logger.warn('Security setting not found for deletion');
      return res.status(404).json({ error: "Security setting not found" });
    }
    logger.info('Security setting deleted successfully');
    res.status(200).json({ message: "Security setting deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting security setting: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createSecuritySettings,
  getAllSecuritySettings,
  getSecuritySettingById,
  updateSecuritySetting,
  deleteSecuritySetting,
};

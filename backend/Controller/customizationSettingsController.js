const CustomizationSettings = require("../Models/customizationSettingsModelSchema");

// Get Customization Settings
async function getSettings(req, res) {
  try {
    const settings = await CustomizationSettings.findOne({});
    if (!settings) {
      console.error("Customization settings not found in the database");
      return res
        .status(404)
        .json({ message: "Customization settings not found" });
    }

    console.log("Customization settings retrieved successfully");
    res.status(200).json(settings);
  } catch (error) {
    console.error(`Error getting customization settings: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Update Customization Settings for theme only
async function updateSettings(req, res) {
  const { theme } = req.body;

  try {
    const settings = await CustomizationSettings.findOne({});

    if (!settings) {
      console.error("Customization settings not found");
      return res
        .status(404)
        .json({ message: "Customization settings not found" });
    }

    if (theme && (theme === "dark" || theme === "light")) {
      settings.theme = theme;
    } else {
      return res.status(400).json({ message: "Invalid theme value" });
    }

    settings.updatedAt = Date.now();
    await settings.save();

    const updatedSettings = await CustomizationSettings.findOne({});

    console.log("Theme updated successfully");
    res.status(200).json({
      message: "Theme updated successfully",
      settings: updatedSettings,
    });
  } catch (error) {
    console.error(`Error updating theme: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { getSettings, updateSettings };

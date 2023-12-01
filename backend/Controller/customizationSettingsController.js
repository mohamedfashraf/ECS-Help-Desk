const CustomizationSetting = require("../Models/customizationSettingsModelSchema");


async function getSetting(req, res) {
    try {
      const users = await CustomizationSetting.find({});
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

async function updateSetting(req, res) {
  try {
    const updates = Object.keys(req.body);
    const setting = await CustomizationSetting.findOne({ admin_id: req.params.admin_id });
    if (!setting) {
      return res.status(404).send();
    }
    updates.forEach((update) => (setting[update] = req.body[update]));
    await setting.save();
    res.status(200).send(setting);
  } catch (error) {
    res.status(400).send(error.message);
  }
}


module.exports = {
  getSetting,
  updateSetting
};
const mongoose = require('mongoose');
const SecuritySettings = require('../Models/securitySettingsModelSchema');

// Create new security settings "works"
async function createSecuritySettings(req, res) {
    try {
        const { user_id, sensitive_data_protection, data_backup_enabled, recovery_procedures, MFA_enabled } = req.body;
        const securitySettings = new SecuritySettings({
            user_id,
            sensitive_data_protection,
            data_backup_enabled,
            recovery_procedures,
            MFA_enabled
        });
        await securitySettings.save();
        res.status(201).json(securitySettings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// Get all security settings "works"
async function getAllSecuritySettings(req, res) {
    try {
        const securitySettings = await SecuritySettings.find({});
        res.status(200).json(securitySettings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get specific security setting by ID "works"
async function getSecuritySettingById(req, res) {
    try {
        const securitySetting = await SecuritySettings.findById(req.params.id);
        if (!securitySetting) {
            return res.status(404).json({ error: 'Security setting not found' });
        }
        res.status(200).json(securitySetting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a security setting by ID "works"
async function updateSecuritySetting(req, res) {
    try {
        const updates = Object.keys(req.body);
        const securitySetting = await SecuritySettings.findById(req.params.id);
        if (!securitySetting) {
            return res.status(404).json({ error: 'Security setting not found' });
        }
        updates.forEach((update) => (securitySetting[update] = req.body[update]));
        await securitySetting.save();
        res.status(200).json(securitySetting);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete a security setting by ID 
async function deleteSecuritySetting(req, res) {
    try {
        const securitySetting = await SecuritySettings.findByIdAndDelete(req.params.id);
        if (!securitySetting) {
            return res.status(404).json({ error: 'Security setting not found' });
        }
        res.status(200).json({ message: 'Security setting deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createSecuritySettings,
    getAllSecuritySettings,
    getSecuritySettingById,
    updateSecuritySetting,
    deleteSecuritySetting
};

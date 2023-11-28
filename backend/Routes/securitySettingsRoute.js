const express = require('express');
const router = express.Router();
const securitySettingsController = require('../Controller/securitySettingsController');

router.post('/security-settings', securitySettingsController.createSecuritySettings);
router.get('/security-settings', securitySettingsController.getAllSecuritySettings);
router.get('/security-settings/:id', securitySettingsController.getSecuritySettingById);
router.put('/security-settings/:id', securitySettingsController.updateSecuritySetting);
router.delete('/security-settings/:id', securitySettingsController.deleteSecuritySetting);

module.exports = router;

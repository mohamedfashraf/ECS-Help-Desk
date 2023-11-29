const express = require('express');
const router = express.Router();
const securitySettingsController = require('../Controller/securitySettingsController');
const authorizationMiddleware = require("../Middleware/authorization"); //authorizationMiddleware(["user"])

router.post('/security-settings', authorizationMiddleware(["user"])
    , securitySettingsController.createSecuritySettings);

router.get('/security-settings', authorizationMiddleware(["user"])
    , securitySettingsController.getAllSecuritySettings);

router.get('/security-settings/:id', authorizationMiddleware(["admin"])
    , securitySettingsController.getSecuritySettingById);

router.put('/security-settings/:id', authorizationMiddleware(["user"])
    , securitySettingsController.updateSecuritySetting);

router.delete('/security-settings/:id', authorizationMiddleware(["admin"])
    , securitySettingsController.deleteSecuritySetting);


module.exports = router;

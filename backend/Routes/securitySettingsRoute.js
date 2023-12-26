const express = require('express');
const router = express.Router();
const securitySettingsController = require('../Controller/securitySettingsController');
const authorizationMiddleware = require("../Middleware/authorization"); //authorizationMiddleware(["user"])

router.post('/', authorizationMiddleware(["admin", "user"])
    , securitySettingsController.createSecuritySettings);

router.get('/', authorizationMiddleware(['admin', "user"])
    , securitySettingsController.getAllSecuritySettings);

router.get('/:id', authorizationMiddleware(["admin"])
    , securitySettingsController.getSecuritySettingById);

router.put('/:id', authorizationMiddleware(["admin", "user"])
    , securitySettingsController.updateSecuritySetting);

router.delete('/:id', authorizationMiddleware(["admin"])
    , securitySettingsController.deleteSecuritySetting);


module.exports = router;

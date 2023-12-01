const express = require('express');
const router = express.Router();
const customizationSettingsController = require('../Controller/customizationSettingsController');
const authorizationMiddleware = require("../Middleware/authorization"); //authorizationMiddleware(["user"])

router.get('/', authorizationMiddleware(["admin"])
    , customizationSettingsController.getSetting);

router.put('/:admin_id', authorizationMiddleware(["admin"])
    , customizationSettingsController.updateSetting);

module.exports = router;
// customizationSettingsRoute.js
const express = require('express');
const router = express.Router();
const customizationSettingsController = require('../Controller/customizationSettingsController');
const authorizationMiddleware = require('../Middleware/authorization');

router.get('/currentTheme', authorizationMiddleware(['admin'])
    , customizationSettingsController.getSettings);

router.put('/changeTheme', authorizationMiddleware(['admin'])
    , customizationSettingsController.updateSettings);

module.exports = router;

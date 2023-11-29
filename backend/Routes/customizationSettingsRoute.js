const express = require('express');
const router = express.Router();
const customizationSettingsController = require('../Controller/customizationSettingsController');
const authorizationMiddleware = require("../Middleware/authorization"); //authorizationMiddleware(["user"])

router.get('/', authorizationMiddleware(["user"]), customizationSettingsController.getSetting);
router.get('/:admin_id', authorizationMiddleware(["admin"]), customizationSettingsController.getSetting);
router.put('/:admin_id', authorizationMiddleware(["user"]), customizationSettingsController.updateSetting);
router.delete('/:admin_id', authorizationMiddleware(["user"]), customizationSettingsController.deleteSetting);

module.exports = router;
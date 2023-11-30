const express = require('express');
const router = express.Router();
const customizationSettingsController = require('../Controller/customizationSettingsController');

router.get('/', customizationSettingsController.getSetting);
router.get('/:admin_id', customizationSettingsController.getSetting);
router.put('/:admin_id', customizationSettingsController.updateSetting);
router.delete('/:admin_id', customizationSettingsController.deleteSetting);

module.exports = router;
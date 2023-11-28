const express = require('express');
const router = express.Router();
const reportsAndAnalyticsController = require('../Controller/reportsAndAnalyticsController');

router.post('/reports', reportsAndAnalyticsController.createReport);
router.get('/reports', reportsAndAnalyticsController.getAllReports);
router.get('/reports/:id', reportsAndAnalyticsController.getReportById);
router.put('/reports/:id', reportsAndAnalyticsController.updateReport);
router.delete('/reports/:id', reportsAndAnalyticsController.deleteReport);

module.exports = router;

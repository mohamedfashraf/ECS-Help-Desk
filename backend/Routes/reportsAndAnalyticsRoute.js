const express = require('express');
const router = express.Router();
const reportsAndAnalyticsController = require('../Controller/reportsAndAnalyticsController');
const authorizationMiddleware = require("../Middleware/authorization"); //authorizationMiddleware(["user"])

router.post('/reports', authorizationMiddleware(["admin", "manager"])
    , reportsAndAnalyticsController.createReport);

router.get('/reports', authorizationMiddleware(["admin", "manager"])
    , reportsAndAnalyticsController.getAllReports);

router.get('/reports/:id', authorizationMiddleware(["admin", "manager"])
    , reportsAndAnalyticsController.getReportById);

router.put('/reports/:id', authorizationMiddleware(["admin", "manager"])
    , reportsAndAnalyticsController.updateReport);

router.delete('/reports/:id', authorizationMiddleware(["admin", "manager"])
    , reportsAndAnalyticsController.deleteReport);

module.exports = router;

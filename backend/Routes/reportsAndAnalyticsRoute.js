const express = require('express');
const router = express.Router();
const reportsAndAnalyticsController = require('../Controller/reportsAndAnalyticsController');
const authorizationMiddleware = require("../Middleware/authorization"); //authorizationMiddleware(["user"])

router.post('/reports', authorizationMiddleware(["user"])
    , reportsAndAnalyticsController.createReport);

router.get('/reports', authorizationMiddleware(["user"])
    , reportsAndAnalyticsController.getAllReports);

router.get('/reports/:id', authorizationMiddleware(["admin"])
    , reportsAndAnalyticsController.getReportById);

router.put('/reports/:id', authorizationMiddleware(["admin"])
    , reportsAndAnalyticsController.updateReport);

router.delete('/reports/:id', authorizationMiddleware(["admin"])
    , reportsAndAnalyticsController.deleteReport);

module.exports = router;

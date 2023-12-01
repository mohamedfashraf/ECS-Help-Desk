const express = require('express');
const router = express.Router();
const reportsAndAnalyticsController = require('../Controller/reportsAndAnalyticsController');
const authorizationMiddleware = require("../Middleware/authorization"); //authorizationMiddleware(["user"])

router.post('/', authorizationMiddleware(["admin", "manager"])
    , reportsAndAnalyticsController.createReport);

router.get('/', authorizationMiddleware(["admin", "manager"])
    , reportsAndAnalyticsController.getAllReports);

router.get('/:id', authorizationMiddleware(["admin", "manager"])
    , reportsAndAnalyticsController.getReportById);

router.put('/:id', authorizationMiddleware(["admin", "manager"])
    , reportsAndAnalyticsController.updateReport);

router.delete('/:id', authorizationMiddleware(["admin", "manager"])
    , reportsAndAnalyticsController.deleteReport);

module.exports = router;

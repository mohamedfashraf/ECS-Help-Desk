const express = require('express');
const router = express.Router();
const reportsAndAnalyticsController = require('../Controller/reportsAndAnalyticsController');
const authorizationMiddleware = require("../Middleware/authorization");

router.post('/', authorizationMiddleware(["admin", "manager"]),
    reportsAndAnalyticsController.createReport);

// Updated analytics route
router.get('/analytics/issues', authorizationMiddleware(["admin", "manager"]),
    reportsAndAnalyticsController.getCommonIssuesAnalytics);

router.get('/', authorizationMiddleware(["admin", "manager"]),
    reportsAndAnalyticsController.getAllReports);

router.get('/:id', authorizationMiddleware(["admin", "manager"]),
    reportsAndAnalyticsController.getReportById);

router.put('/:id', authorizationMiddleware(["admin", "manager"]),
    reportsAndAnalyticsController.updateReport);

router.delete('/:id', authorizationMiddleware(["admin", "manager"]),
    reportsAndAnalyticsController.deleteReport);

router.get('/ticketStatus-report/:id', authorizationMiddleware(["admin", "manager"]),
    reportsAndAnalyticsController.getReportsByTicketStatus);

module.exports = router;

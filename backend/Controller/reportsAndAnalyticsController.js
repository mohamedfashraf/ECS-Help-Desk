const logger = require('../Controller/loggerController'); // Adjust the path accordingly
const mongoose = require('mongoose');
const Report = require('../Models/reportsAndAnalyticsModelSchema');
const Ticket = require('../Models/ticektsModelSchema');

// Create a new report
async function createReport(req, res) {
    try {
        const { type, generatedBy, ticketId, keyWords } = req.body;

        if (!mongoose.Types.ObjectId.isValid(ticketId)) {
            return res.status(400).json({ error: 'Invalid ticketId' });
        }

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        const existingReport = await Report.findOne({ ticketId });
        if (existingReport) {
            logger.warn('A report for this ticket already exists');
            return res.status(409).json({ error: 'A report for this ticket already exists' });
        }

        const report = new Report({ type, generatedBy, ticketId, keyWords });
        await report.save();

        logger.info('Report created successfully');
        res.status(201).json(report);
    } catch (error) {
        logger.error(`Error creating report: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

// Get all reports
async function getAllReports(req, res) {
    try {
        const reports = await Report.find({});
        logger.info('Retrieved all reports successfully');
        res.status(200).json(reports);
    } catch (error) {
        logger.error(`Error retrieving all reports: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

// Get a report by ID
async function getReportById(req, res) {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            logger.warn('Report not found');
            return res.status(404).json({ error: 'Report not found' });
        }
        logger.info('Retrieved report by ID successfully');
        res.status(200).json(report);
    } catch (error) {
        logger.error(`Error retrieving report by ID: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

// Update a report by ID
async function updateReport(req, res) {
    try {
        const updates = Object.keys(req.body);
        const report = await Report.findById(req.params.id);
        if (!report) {
            logger.warn('Report not found for updating');
            return res.status(404).json({ error: 'Report not found' });
        }
        updates.forEach((update) => (report[update] = req.body[update]));
        await report.save();
        logger.info('Report updated successfully');
        res.status(200).json(report);
    } catch (error) {
        logger.error(`Error updating report: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
}

// Delete a report by ID
async function deleteReport(req, res) {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);
        if (!report) {
            logger.warn('Report not found for deletion');
            return res.status(404).json({ error: 'Report not found' });
        }
        logger.info('Report deleted successfully');
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting report: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

// Example: Generate Reports on Ticket Status
async function getReportsByTicketStatus(req, res) {
    try {
        const { status } = req.query;

        if (!status) {
            logger.warn('Status parameter is required');
            return res.status(400).json({ error: 'Status parameter is required' });
        }

        const reports = await Report.find({ type: 'ticket', ticketId: status });

        logger.info('Retrieved reports by ticket status successfully');
        res.status(200).json(reports);
    } catch (error) {
        logger.error(`Error generating reports by ticket status: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

// Example: Analytics to Identify Common Issues
async function getCommonIssuesAnalytics(req, res) {
    try {

        // Perform aggregation to count each keyword
        const keywordAnalyticsResult = await Report.aggregate([
            { $match: { keyWords: { $exists: true, $ne: [] } } },
            { $unwind: '$keyWords' },
            { $group: { _id: '$keyWords', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);


        // Perform aggregation to count each type
        const typeAnalyticsResult = await Report.aggregate([
            { $match: { type: { $exists: true, $ne: null } } },
            { $group: { _id: '$type', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Return both results
        res.status(200).json({ keywords: keywordAnalyticsResult, types: typeAnalyticsResult });
    } catch (error) {
        console.error('Error in getCommonIssuesAnalytics:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createReport,
    getAllReports,
    getReportById,
    updateReport,
    deleteReport,
    getReportsByTicketStatus,
    getCommonIssuesAnalytics,
};

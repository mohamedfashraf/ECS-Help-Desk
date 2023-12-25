const mongoose = require('mongoose');
const Report = require('../Models/reportsAndAnalyticsModelSchema');
const Ticket = require('../Models/ticektsModelSchema');

// Create a new report "works"
async function createReport(req, res) {
    try {
        const { type, generatedBy, ticketId, keyWords } = req.body;

        // Check if the provided ticketId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(ticketId)) {
            return res.status(400).json({ error: 'Invalid ticketId' });
        }

        // Check if the ticket with the provided ticketId exists
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        // Check if a report for the provided ticketId already exists
        const existingReport = await Report.findOne({ ticketId });
        if (existingReport) {
            return res.status(409).json({ error: 'A report for this ticket already exists' });
        }

        // Create a new report with the specified ticketId
        const report = new Report({ type, generatedBy, ticketId, keyWords });
        await report.save();

        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Get all reports "works"
async function getAllReports(req, res) {
    try {
        const reports = await Report.find({});
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a report by ID "works"
async function getReportById(req, res) {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a report by ID "works"
async function updateReport(req, res) {
    try {
        const updates = Object.keys(req.body);
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        updates.forEach((update) => (report[update] = req.body[update]));
        await report.save();
        res.status(200).json(report);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete a report by ID "works"
async function deleteReport(req, res) {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Example: Generate Reports on Ticket Status
async function getReportsByTicketStatus(req, res) {
    try {
        const { status } = req.query;

        // Check if the status is provided
        if (!status) {
            return res.status(400).json({ error: 'Status parameter is required' });
        }

        // Find reports based on ticketId
        const reports = await Report.find({ type: 'ticket', ticketId: status });

        return res.status(200).json(reports);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Example: Analytics to Identify Common Issues
async function getCommonIssuesAnalytics(req, res) {
    try {
        // Use aggregation to count occurrences of all keywords
        const analyticsResult = await Report.aggregate([
            { $match: { type: 'issue' } }, // Filter to only include reports of type 'issue'
            { $unwind: '$keyWords' },      // Unwind the array of keywords
            { $group: { _id: '$keyWords', count: { $sum: 1 } } }, // Group by keywords and count occurrences
            { $sort: { count: -1 } }      // Optionally, sort the results by count in descending order
        ]);

        res.status(200).json(analyticsResult);
    } catch (error) {
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

const Report = require('../Models/reportsAndAnalyticsModelSchema');

// Create a new report "works"
async function createReport(req, res) {
    try {
        const { type, generatedBy } = req.body;
        const report = new Report({ type, generatedBy });
        await report.save();
        res.status(201).json(report);
    } catch (error) {
        res.status(400).json({ error: error.message });
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

// Get a report by ID 
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

// Update a report by ID
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

// Delete a report by ID
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

module.exports = {
    createReport,
    getAllReports,
    getReportById,
    updateReport,
    deleteReport,
};

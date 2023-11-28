const Issue = require('../Models/knowledgeBaseModelSchema'); // Adjust the path based on your project structure

// Create a new issue "works"
async function createIssue(req, res) {
    try {
        const { content, category, keyWords } = req.body;
        const issue = new Issue({ content, category, keyWords });
        await issue.save();
        res.status(201).json(issue);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get all issues "works"
async function getAllIssues(req, res) {
    try {
        const issues = await Issue.find({});
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get an issue by ID "works"
async function getIssueById(req, res) {
    try {
        const issue = await Issue.findById(req.params.id);
        if (!issue) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        res.status(200).json(issue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update an issue by ID "works"
async function updateIssue(req, res) {
    try {
        const updates = Object.keys(req.body);
        const issue = await Issue.findById(req.params.id);
        if (!issue) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        updates.forEach((update) => (issue[update] = req.body[update]));
        issue.updatedAt = Date.now(); // Update the updatedAt field
        await issue.save();
        res.status(200).json(issue);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete an issue by ID "works"
async function deleteIssue(req, res) {
    try {
        const issue = await Issue.findByIdAndDelete(req.params.id);
        if (!issue) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        res.status(200).json({ message: 'Issue deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createIssue,
    getAllIssues,
    getIssueById,
    updateIssue,
    deleteIssue,
};

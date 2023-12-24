const logger = require('../Controller/loggerController'); // Adjust the path accordingly
const Issue = require("../Models/knowledgeBaseModelSchema");

// Create a new issue "works"
async function createIssue(req, res) {
  try {
    const { content, category, keyWords } = req.body;
    const issue = new Issue({ content, category, keyWords });
    await issue.save();
    logger.info('New issue created successfully');
    res.status(201).json(issue);
  } catch (error) {
    logger.error(`Error creating issue: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
}

// Get all issues grouped by category "works"
async function getAllIssuesByCategory(req, res) {
  try {
    const issuesByCategory = await Issue.aggregate([
      {
        $group: {
          _id: "$category",
          issues: { $push: "$$ROOT" },
        },
      },
    ]);
    logger.info('Retrieved issues grouped by category successfully');
    res.status(200).json(issuesByCategory);
  } catch (error) {
    logger.error(`Error retrieving issues by category: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}

// get all issues "works"
async function getIssues(req, res) {
    try {
        const issues = await Issue.find();
        if (!issues) {
            logger.error('No issues found');
            return res.status(404).json({ error: 'No issues found' });
        }
        logger.info('Retrieved all issues successfully');
        res.status(200).json(issues);
    } catch (error) {
        logger.error(`Error retrieving all issues: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

// Get all issues or search based on keyword "works"
async function getAllOrSearchIssues(req, res) {
  try {
    const { keyword } = req.query;
    let query = {};
    if (keyword) {
      query = {
        $or: [
          { content: { $regex: keyword, $options: "i" } }, // Case-insensitive search
          { keyWords: { $in: [keyword] } },
        ],
      };
    }
    const issues = await Issue.find(query);
    logger.info('Retrieved issues based on keyword successfully');
    res.status(200).json(issues);
  } catch (error) {
    logger.error(`Error retrieving issues based on keyword: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}

// Get an issue by ID "works"
async function getIssueById(req, res) {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      logger.error('Issue not found');
      return res.status(404).json({ error: "Issue not found" });
    }
    logger.info('Retrieved issue by ID successfully');
    res.status(200).json(issue);
  } catch (error) {
    logger.error(`Error retrieving issue by ID: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}

// Update an issue by ID "works"
async function updateIssue(req, res) {
  try {
    const updates = Object.keys(req.body);
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      logger.error('Issue not found');
      return res.status(404).json({ error: "Issue not found" });
    }
    updates.forEach((update) => (issue[update] = req.body[update]));
    issue.updatedAt = Date.now(); // Update the updatedAt field
    await issue.save();
    logger.info('Updated issue by ID successfully');
    res.status(200).json(issue);
  } catch (error) {
    logger.error(`Error updating issue by ID: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
}

// Delete an issue by ID "works"
async function deleteIssue(req, res) {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);
    if (!issue) {
      logger.error('Issue not found');
      return res.status(404).json({ error: "Issue not found" });
    }
    logger.info('Deleted issue by ID successfully');
    res.status(200).json({ message: "Issue deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting issue by ID: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
    createIssue,
    getAllIssuesByCategory,
    getAllOrSearchIssues,
    getIssueById,
    updateIssue,
    deleteIssue,
    getIssues,
};

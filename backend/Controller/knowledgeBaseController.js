const Issue = require("../Models/knowledgeBaseModelSchema");

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
    res.status(200).json(issuesByCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get all issues "works"
async function getIssues(req, res) {
    try {
        const issues = await Issue.find();
        if (!issues) {
            return res.status(404).json({ error: 'No issues found' });
        }
        res.status(200).json(issues);
    } catch (error) {
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
      return res.status(404).json({ error: "Issue not found" });
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
      return res.status(404).json({ error: "Issue not found" });
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
      return res.status(404).json({ error: "Issue not found" });
    }
    res.status(200).json({ message: "Issue deleted successfully" });
  } catch (error) {
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

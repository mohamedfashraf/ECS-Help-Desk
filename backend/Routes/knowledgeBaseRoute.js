const express = require('express');
const router = express.Router();
const knowledgeBaseController = require('../Controller/knowledgeBaseController');
const authorizationMiddleware = require("../Middleware/authorization");

// Create a new issue
router.post('/', authorizationMiddleware(["admin"])
    , knowledgeBaseController.createIssue);

// Get all issues or search based on keyword
router.get('/', authorizationMiddleware(["user", "admin"])
    , knowledgeBaseController.getAllOrSearchIssues);

// Get all issues grouped by category
router.get('/categories', authorizationMiddleware(["user", "admin"])
    , knowledgeBaseController.getAllIssuesByCategory);

// Get an issue by ID
router.get('/:id', authorizationMiddleware(["user", "admin"])
    , knowledgeBaseController.getIssueById);

// Update an issue by ID
router.put('/:id', authorizationMiddleware(["admin"])
    , knowledgeBaseController.updateIssue);

// Delete an issue by ID
router.delete('/:id', authorizationMiddleware(["admin"])
    , knowledgeBaseController.deleteIssue);

module.exports = router;

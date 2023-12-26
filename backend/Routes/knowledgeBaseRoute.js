const express = require("express");
const router = express.Router();
const knowledgeBaseController = require("../Controller/knowledgeBaseController");
const authorizationMiddleware = require("../Middleware/authorization");

// Create a new issue
router.post(
  "/",
  authorizationMiddleware(["admin", "agent"]),
  knowledgeBaseController.createIssue
);

//get all issues
router.get(
  "/all",
  authorizationMiddleware(["user", "admin", "agent"]),
  knowledgeBaseController.getIssues
);

// Get all issues or search based on keyword
router.get(
  "/",
  authorizationMiddleware(["user", "admin", "agent"]),
  knowledgeBaseController.getAllOrSearchIssues
);

// Get all issues grouped by category
router.get(
  "/categories",
  authorizationMiddleware(["user", "admin"]),
  knowledgeBaseController.getAllIssuesByCategory
);

// Get an issue by ID
router.get(
  "/:id",
  authorizationMiddleware(["user", "admin"]),
  knowledgeBaseController.getIssueById
);

// Update an issue by ID
router.put(
  "/:id",
  authorizationMiddleware(["agent", "admin"]),
  knowledgeBaseController.updateIssue
);

// Delete an issue by ID
router.delete(
  "/:id",
  authorizationMiddleware(["agent", "admin"]),
  knowledgeBaseController.deleteIssue
);

module.exports = router;

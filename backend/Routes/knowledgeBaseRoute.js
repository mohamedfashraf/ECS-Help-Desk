const express = require('express');
const router = express.Router();
const knowledgeBaseController = require('../Controller/knowledgeBaseController');
const authorizationMiddleware = require("../Middleware/authorization"); //authorizationMiddleware(["user"])

router.post('/', authorizationMiddleware(["admin"])
    , knowledgeBaseController.createIssue);

router.get('/', authorizationMiddleware(["user"])
    , knowledgeBaseController.getAllIssues);

router.get('/:id', authorizationMiddleware(["user"])
    , knowledgeBaseController.getIssueById);

router.put('/:id', authorizationMiddleware(["admin"])
    , knowledgeBaseController.updateIssue);

router.delete('/:id', authorizationMiddleware(["admin"])
    , knowledgeBaseController.deleteIssue);

module.exports = router;

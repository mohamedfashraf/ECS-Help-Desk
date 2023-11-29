const express = require('express');
const router = express.Router();
const knowledgeBaseController = require('../Controller/knowledgeBaseController');
const authorizationMiddleware = require("../Middleware/authorization"); //authorizationMiddleware(["user"])

router.post('/knowledgeBase', authorizationMiddleware(["admin"]), knowledgeBaseController.createIssue);
router.get('/knowledgeBase', authorizationMiddleware(["user"]), knowledgeBaseController.getAllIssues);
router.get('/knowledgeBase/:id', authorizationMiddleware(["admin"]), knowledgeBaseController.getIssueById);
router.put('/knowledgeBase/:id', authorizationMiddleware(["admin"]), knowledgeBaseController.updateIssue);
router.delete('/knowledgeBase/:id', authorizationMiddleware(["admin"]), knowledgeBaseController.deleteIssue);

module.exports = router;

const express = require('express');
const router = express.Router();
const knowledgeBaseController = require('../Controller/knowledgeBaseController');

router.post('/knowledgeBase', knowledgeBaseController.createIssue);
router.get('/knowledgeBase', knowledgeBaseController.getAllIssues);
router.get('/knowledgeBase/:id', knowledgeBaseController.getIssueById);
router.put('/knowledgeBase/:id', knowledgeBaseController.updateIssue);
router.delete('/knowledgeBase/:id', knowledgeBaseController.deleteIssue);

module.exports = router;

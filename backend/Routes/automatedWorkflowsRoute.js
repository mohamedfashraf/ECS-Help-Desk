const express = require('express');
const router = express.Router();
const automatedWorkflowsModelController = require('../Controller/automatedWorkflowsModelController')
// Define your routes here
router.get('/', automatedWorkflowsModelController.getAllAutomatedWorkflows);
router.get('/:id', automatedWorkflowsModelController.getAutomatedWorkflowById);
router.post('/', automatedWorkflowsModelController.createAutomatedWorkflow);
router.put('/:id', automatedWorkflowsModelController.updateAutomatedWorkflow);
router.delete('/:id', automatedWorkflowsModelController.deleteAutomatedWorkflow);

module.exports = router;

const express = require('express');
const router = express.Router();
const automatedWorkflowsModelController = require('../Controller/automatedWorkflowsModelController'); // Update with the correct path to your routes file

router.post('/', automatedWorkflowsModelController.createAutomatedWorkflow);
router.get('/', automatedWorkflowsModelController.getAllAutomatedWorkflows);  
router.get('/:id', automatedWorkflowsModelController.getAutomatedWorkflowById);  
router.put('/:id', automatedWorkflowsModelController.updateAutomatedWorkflow);
router.delete('/:id', automatedWorkflowsModelController.deleteAutomatedWorkflow); 


module.exports = router;
 
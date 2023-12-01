const express = require('express');
const router = express.Router();
const automatedWorkflowsModelController = require('../Controller/automatedWorkflowsModelController'); // Update with the correct path to your routes file

router.post('/', automatedWorkflowsModelController.createAutomatedWorkflow);
router.get('/', automatedWorkflowsModelController.getAllAutomatedWorkflows);  
router.put('/:id', automatedWorkflowsModelController.getAutomatedWorkflowById);
router.delete('/:id', automatedWorkflowsModelController.updateAutomatedWorkflow); 


module.exports = router;
 
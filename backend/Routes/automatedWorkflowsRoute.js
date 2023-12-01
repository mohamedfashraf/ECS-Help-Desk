const express = require('express');
const router = express.Router();
const workflowRoutes = require('../Controller/automatedWorkflowsModelController'); // Update with the correct path to your routes file

router.post('/', workflowRoutes.createWorkflow);
router.get('/', workflowRoutes.getWorkflow);  
router.put('/:id', workflowRoutes.updateWorkflow);
router.delete('/:id', workflowRoutes.deleteWorkflow); 


module.exports = router;
 
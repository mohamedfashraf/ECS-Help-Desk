const express = require('express');
const router = express.Router();
const SupportAgentController = require('../Controller/SupportAgentController'); // Adjust the path to where your UserController is located

router.post('/', SupportAgentController.createSupportAgent);
router.get('/', SupportAgentController.getAllSupportAgents);
router.get('/:id', SupportAgentController.getSupportAgentById);
router.put('/:id', SupportAgentController.updateSupportAgent);
router.delete('/:id', SupportAgentController.deleteSupportAgent);

module.exports = router;

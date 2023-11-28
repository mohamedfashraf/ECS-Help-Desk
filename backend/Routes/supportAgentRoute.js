const express = require('express');
const router = express.Router();
const supportAgentController = require('../Controller/supportAgentController');

router.post('/support-agents', supportAgentController.createSupportAgent);
router.get('/support-agents', supportAgentController.getAllSupportAgents);
router.get('/support-agents/:id', supportAgentController.getSupportAgentById);
router.put('/support-agents/:id', supportAgentController.updateSupportAgent);
router.delete('/support-agents/:id', supportAgentController.deleteSupportAgent);

module.exports = router;

const express = require('express');
const router = express.Router();
const supportAgentController = require('../Controller/supportAgentController');
const authorizationMiddleware = require("../Middleware/authorization"); //authorizationMiddleware(["user"])

router.post('/support-agents', authorizationMiddleware(["admin"])
    , supportAgentController.createSupportAgent);

router.get('/support-agents', authorizationMiddleware(["admin"])
    , supportAgentController.getAllSupportAgents);

router.get('/support-agents/:id', authorizationMiddleware(["admin"])
    , supportAgentController.getSupportAgentById);

router.put('/support-agents/:id', authorizationMiddleware(["admin"])
    , supportAgentController.updateSupportAgent);

router.delete('/support-agents/:id', authorizationMiddleware(["admin"])
    , supportAgentController.deleteSupportAgent);

module.exports = router;

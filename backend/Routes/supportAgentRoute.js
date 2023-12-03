const express = require('express');
const router = express.Router();
const supportAgentController = require('../Controller/supportAgentController');
const authorizationMiddleware = require("../Middleware/authorization"); //authorizationMiddleware(["user"])

router.post('/', authorizationMiddleware(["admin"])
    , supportAgentController.createSupportAgent);

router.get('/', authorizationMiddleware(["admin"])
    , supportAgentController.getAllSupportAgents);

router.get('/:id', authorizationMiddleware(["admin"])
    , supportAgentController.getSupportAgentById);

router.put('/:id', authorizationMiddleware(["admin"])
    , supportAgentController.updateSupportAgent);

router.delete('/:id', authorizationMiddleware(["admin"])
    , supportAgentController.deleteSupportAgent);

module.exports = router;

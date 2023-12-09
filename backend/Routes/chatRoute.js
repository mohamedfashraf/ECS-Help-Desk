const express = require('express');
const router = express.Router();
const chatController = require('../Controller/ChatController');
const authorizationMiddleware = require("../Middleware/authorization"); //authorizationMiddleware(["user"])


router.post('/', authorizationMiddleware(["user", "agent", "admin"])
    , chatController.createChat);

router.get('/:userId', authorizationMiddleware(["user", "agent", "admin"])
    , chatController.findUserChats);

router.get('/find/:userId/:agentId', authorizationMiddleware(["user", "agent", "admin"])
    , chatController.findChat);

module.exports = router;
const express = require('express');
const router = express.Router();
const chatMessageController = require('../Controller/EmailSystemController');
const authorizationMiddleware = require("../Middleware/authorization");

router.get('/receiveMessage', authorizationMiddleware(["user", "agent", "admin"])
    , chatMessageController.receiveMessage);

router.post('/', authorizationMiddleware(["user", "agent", "admin"])
    , chatMessageController.createEmail);

router.get('/', authorizationMiddleware(["agent", "admin"])
    , chatMessageController.getAllConversations);

router.get('/:id', authorizationMiddleware(["user", "agent", "admin"])
    , chatMessageController.getConversationById);

router.post('/reply', authorizationMiddleware(["user", "agent", "admin"])
    , chatMessageController.replyMessages);

router.delete('/:id', authorizationMiddleware(["agent", "admin"])
    , chatMessageController.deleteConversation);

module.exports = router;

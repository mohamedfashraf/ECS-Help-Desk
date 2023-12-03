const express = require('express');
const router = express.Router();
const chatMessageController = require('../Controller/chatMessagesController');
const authorizationMiddleware = require("../Middleware/authorization"); //authorizationMiddleware(["user"])

router.post('/', authorizationMiddleware(["user", "admin"])
    , chatMessageController.createConversation);

router.get('/', authorizationMiddleware(["admin"])
    , chatMessageController.getAllConversations);

router.get('/:id', authorizationMiddleware(["admin"])
    , chatMessageController.getConversationById);

router.put('/:id', authorizationMiddleware(["admin"])
    , chatMessageController.updateConversation);

router.delete('/:id', authorizationMiddleware(["admin"])
    , chatMessageController.deleteConversation);

module.exports = router;
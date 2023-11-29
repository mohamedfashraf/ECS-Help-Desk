const express = require('express');
const router = express.Router();
const chatMessageController = require('../Controller/chatMessagesController');
const authorizationMiddleware = require("../Middleware/authorization"); //authorizationMiddleware(["user"])

router.post('/conversations', authorizationMiddleware(["user", "admin"])
    , chatMessageController.createConversation);

router.get('/conversations', authorizationMiddleware(["admin"])
    , chatMessageController.getAllConversations);

router.get('/conversations/:id', authorizationMiddleware(["admin"])
    , chatMessageController.getConversationById);
    
router.put('/conversations/:id', authorizationMiddleware(["admin"])
    , chatMessageController.updateConversation);

router.delete('/conversations/:id', authorizationMiddleware(["admin"])
    , chatMessageController.deleteConversation);

module.exports = router;
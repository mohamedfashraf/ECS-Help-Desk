const express = require('express');
const router = express.Router();
const chatMessageController = require('../Controller/EmailSystemController');
const authorizationMiddleware = require("../Middleware/authorization");

router.post('/', authorizationMiddleware(["user", "agent", "admin"])
    , chatMessageController.createEmail);

router.get('/inbox', authorizationMiddleware(["user", "agent", "admin"])
    , chatMessageController.getUserEmails);

router.get('/:id', authorizationMiddleware(["user", "agent", "admin"])
    , chatMessageController.getEmailById);

router.post('/reply', authorizationMiddleware(["user", "agent", "admin"])
    , chatMessageController.replyMessages);

router.delete('/:id', authorizationMiddleware(["agent", "admin"])
    , chatMessageController.deleteConversation);

module.exports = router;

const express = require('express');
const router = express.Router();
const chatMessageController = require('../Controller/chatMessagesController');

router.post('/conversations', chatMessageController.createConversation);
router.get('/conversations', chatMessageController.getAllConversations);
router.get('/conversations/:id', chatMessageController.getConversationById);
router.put('/conversations/:id', chatMessageController.updateConversation);
router.delete('/conversations/:id', chatMessageController.deleteConversation);

module.exports = router;
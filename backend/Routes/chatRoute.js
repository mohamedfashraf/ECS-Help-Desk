const express = require('express');
const router = express.Router();
const chatController = require('../Controller/ChatController');

router.post('/', chatController.createChat);

router.get('/:userId', chatController.findUserChats);

router.get('/find/:userId/:agentId', chatController.findChat);

module.exports = router;
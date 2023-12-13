const express = require('express');
const router = express.Router();
const messageController = require('../Controller/messageController');

router.post('/', messageController.createMessage);

router.get('/:chatId', messageController.getMessages);

module.exports = router;
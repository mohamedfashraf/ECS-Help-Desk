// ChatMessage.js
const mongoose = require('mongoose');

const liveChatSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const ChatMessage = mongoose.model('ChatMessage', liveChatSchema);

module.exports = ChatMessage;
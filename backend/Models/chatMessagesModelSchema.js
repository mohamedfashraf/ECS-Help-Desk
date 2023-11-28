const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const ChatMessagesSchema = new Schema({
    ticketId: {
        type: Schema.Types.ObjectId,  // Use Schema.Types.ObjectId directly here
        required: true
    },
    participants: [{
        type: Schema.Types.ObjectId,  // Use Schema.Types.ObjectId directly here
        required: true
    }],
    messages: [MessageSchema]
});

const ChatMessages = mongoose.model('chatMessages', ChatMessagesSchema);

module.exports = ChatMessages;

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

const ConversationSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    ticketId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    participants: [{
        type: Schema.Types.ObjectId,
        required: true
    }],
    messages: [MessageSchema]
});

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;

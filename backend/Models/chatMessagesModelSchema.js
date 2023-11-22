const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the Message schema
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

// Define the main document schema
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

// Compile the model from the schema
const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;

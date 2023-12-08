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

const emailSystemSchema = new Schema({
    agentName: {
        type: String,
        require: false
    },
    userName: {
        type: String,
        required: false
    },
    userEmail: {
        type: String,
        required: true
    },
    agentEmail: {
        type: String,
        default: "agent@gmail.com",
        required: true
    },
    messages: [MessageSchema]
});

const Emails = mongoose.model('emails', emailSystemSchema);

module.exports = Emails;

// ChatMessage.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    members: {
        type: Array,
        required: true
    }
},
    { timestamps: true }
);


const chatModel = mongoose.model('Chat', chatSchema);

module.exports = chatModel;
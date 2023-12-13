const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true // Making the text field required
    }
},
    { timestamps: true }
);

const messageModel = mongoose.model('Message', messageSchema);

module.exports = messageModel;

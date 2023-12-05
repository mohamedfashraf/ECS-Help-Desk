const mongoose = require('mongoose');
const ChatMessages = require('../Models/chatMessagesModelSchema');

// Create a new conversation "works"
async function createConversation(req, res) {
    try {
        const loggedInUser = req.user.role;
        const senderName = req.user.name;

        if (loggedInUser == "agent" || loggedInUser == "admin") {
            const { ticketId, userId, messages } = req.body;
            const agentId = req.user.userId;
            const conversation = new ChatMessages({
                ticketId,
                userId,
                agentId,
                messages: messages.map(({ message }) => ({ sender: senderName, message })),
            });
            await conversation.save();
            res.status(201).json(conversation);
        } else if (loggedInUser == "user") {
            const { ticketId, agentId, messages } = req.body;
            const userId = req.user.userId;
            const conversation = new ChatMessages({
                ticketId,
                userId,
                agentId,
                messages: messages.map(({ message }) => ({ sender: senderName, message })),
            });

            await conversation.save();
            res.status(201).json(conversation);
        } else {
            res.status(400).json({ error: 'Invalid user type' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get all conversations "works"
async function getAllConversations(req, res) {
    try {
        const conversations = await ChatMessages.find({});
        console.log('Retrieved Conversations:', conversations);
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a specific conversation by ID "works"
async function getConversationById(req, res) {
    try {
        const conversation = await ChatMessages.findById(req.params.id);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// reply on a conversation by ID "works"
async function replyMessages(req, res) {
    try {
        const ticketId = req.body.ticketId;
        const userId = req.user.userId;
        const loggedInUser = req.user.role;
        const newMessageContent = req.body.message;
        const senderName = req.user.name;

        if (loggedInUser == "agent" || loggedInUser == "admin") {
            const conversation = await ChatMessages.findOne({
                ticketId: ticketId, agentId: userId
            });
            if (!conversation) {
                return res.status(404).json({ error: 'Conversation not found or not assigned to this user' });
            }
            const newMessage = {
                sender: senderName,
                message: newMessageContent
            };
            conversation.messages.push(newMessage);
            const updatedConversation = await conversation.save();

            res.status(200).json(updatedConversation);
        } else if (loggedInUser == "user") {
            const conversation = await ChatMessages.findOne({ ticketId: ticketId, userId: userId });
            if (!conversation) {
                return res.status(404).json({ error: 'Conversation not found or not assigned to this user' });
            }
            const newMessage = {
                sender: senderName,
                message: newMessageContent
            };
            conversation.messages.push(newMessage);
            const updatedConversation = await conversation.save();

            res.status(200).json(updatedConversation);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete a conversation by ID "works"
async function deleteConversation(req, res) {
    try {
        const conversation = await ChatMessages.findByIdAndDelete(req.params.id);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        res.status(200).json({ message: 'Conversation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// user receiving messages "works"
async function receiveMessage(req, res) {
    try {
        const userId = req.user.userId;

        const messages = await ChatMessages.find({ userId });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createConversation,
    getAllConversations,
    getConversationById,
    replyMessages,
    deleteConversation,
    receiveMessage
};

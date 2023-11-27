const mongoose = require('mongoose');
const ChatMessages = require('../Models/chatMessagesModelSchema');

// Create a new conversation
async function createConversation(req, res) {
    try {
        const { ticketId, participants, messages } = req.body;

        const conversation = new ChatMessages({
            ticketId,
            participants,
            messages
        });

        await conversation.save();
        res.status(201).json(conversation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get all conversations
async function getAllConversations(req, res) {
    try {
        const conversations = await ChatMessages.find({});
        console.log('Retrieved Conversations:', conversations);
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a specific conversation by ID
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

// Update a conversation by ID
async function updateConversation(req, res) {
    try {
        const updates = req.body;
        const conversation = await ChatMessages.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        res.status(200).json(conversation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete a conversation by ID
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

module.exports = {
    createConversation,
    getAllConversations,
    getConversationById,
    updateConversation,
    deleteConversation
};

const chatModel = require('../models/ChatModelSchema');

const createChat = async (req, res) => {
    const { firstId, secondId } = req.body;

    // Validate required parameters
    if (!firstId || !secondId) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }

    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] },
        });

        if (chat) {
            return res.status(200).json({ chat });
        }

        const newChat = new chatModel({
            members: [firstId, secondId],
        });

        const response = await newChat.save();

        res.status(200).json({ chat: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const findUserChats = async (req, res) => {
    const { userId } = req.params;

    // Validate required parameter
    if (!userId) {
        return res.status(400).json({ message: 'Missing required parameter: userId' });
    }

    try {
        const chats = await chatModel.find({
            members: { $in: [userId] },
        });
        res.status(200).json({ chats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const findChat = async (req, res) => {
    const { firstId, secondId } = req.params;

    // Validate required parameters
    if (!firstId || !secondId) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }

    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] },
        });
        res.status(200).json(chat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createChat,
    findUserChats,
    findChat,
};

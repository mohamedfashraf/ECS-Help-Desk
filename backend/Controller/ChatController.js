const logger = require('../Controller/loggerController');
const chatModel = require('../models/ChatModelSchema');

const createChat = async (req, res) => {
    const { firstId, secondId } = req.body;

    // Validate required parameters
    if (!firstId || !secondId) {
        logger.error('Missing required parameters');
        return res.status(400).json({ message: 'Missing required parameters' });
    }

    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] },
        });

        if (chat) {
            logger.info('Chat already exists');
            return res.status(200).json({ chat });
        }

        const newChat = new chatModel({
            members: [firstId, secondId],
        });

        const response = await newChat.save();

        logger.info('New chat created successfully');
        res.status(200).json({ chat: response });
    } catch (error) {
        logger.error(`Server error: ${error.message}`);
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const findUserChats = async (req, res) => {
    const { userId } = req.params;

    // Validate required parameter
    if (!userId) {
        logger.error('Missing required parameter: userId');
        return res.status(400).json({ message: 'Missing required parameter: userId' });
    }

    try {
        const chats = await chatModel.find({
            members: { $in: [userId] },
        });

        logger.info('User chats retrieved successfully');
        res.status(200).json({ chats });
    } catch (error) {
        logger.error(`Server error: ${error.message}`);
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const findChat = async (req, res) => {
    const { firstId, secondId } = req.params;

    // Validate required parameters
    if (!firstId || !secondId) {
        logger.error('Missing required parameters');
        return res.status(400).json({ message: 'Missing required parameters' });
    }

    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] },
        });

        logger.info('Chat retrieved successfully');
        res.status(200).json(chat);
    } catch (error) {
        logger.error(`Server error: ${error.message}`);
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createChat,
    findUserChats,
    findChat,
};

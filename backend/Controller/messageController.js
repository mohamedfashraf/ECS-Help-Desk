const logger = require('../Controller/loggerController'); // Adjust the path accordingly
const messageModel = require('../Models/messageSchemaModel');

const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;
    try {
        const newMessage = new messageModel({
            chatId,
            senderId,
            text
        });

        const response = await newMessage.save();
        logger.info('New message created successfully');
        res.status(200).json({ message: response });
    } catch (error) {
        logger.error(`Error creating message: ${error.message}`);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const messages = await messageModel.find({
            chatId
        });
        logger.info('Retrieved messages successfully');
        res.status(200).json({ messages });
    } catch (error) {
        logger.error(`Error retrieving messages: ${error.message}`);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createMessage,
    getMessages
};

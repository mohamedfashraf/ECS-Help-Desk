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
        res.status(200).json({ message: response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const messages = await messageModel.find({
            chatId
        });
        res.status(200).json({ messages });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createMessage,
    getMessages
};
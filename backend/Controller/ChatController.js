const chatModel = require('../Models/ChatModelSchema');

const createChat = async (req, res) => {
    const { userId, agentId } = req.body;
    try {
        const chat = await chatModel.findOne({
            members: { $all: [userId, agentId] }
        });
        if (chat) {
            return res.status(200).json({ chat });
        }
        const newChat = new chatModel({
            members: [userId, agentId]
        });

        const response = await newChat.save();

        res.status(200).json({ chat: response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const findUserChats = async (req, res) => {
    const { userId } = req.params;
    try {
        const chats = await chatModel.find({
            members: { $in: [userId] }
        });
        res.status(200).json({ chats });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const findChat = async (req, res) => {
    const { userId, agentId } = req.params;
    try {
        const chat = await chatModel.find({
            members: { $all: [userId, agentId] }
        });
        res.status(200).json({ chat });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createChat,
    findUserChats,
    findChat
};

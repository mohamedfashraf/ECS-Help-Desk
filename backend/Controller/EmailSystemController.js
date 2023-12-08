const mongoose = require('mongoose');
const Emails = require('../Models/emailSystemModelSchema');
const nodemailer = require('nodemailer');

// Create a new email and get notifications tp user Gmail "works"
async function createEmail(req, res) {
    try {
        const loggedInUser = req.user.role;
        const senderName = req.user.name;

        if (loggedInUser == "agent" || loggedInUser == "admin") {
            const { userEmail, messages } = req.body;
            const agentName = req.user.name;
            const agentEmail = req.user.email;
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: agentEmail,
                    pass: "grtrdrwufhoilhll"
                },
                secure: true
            });

            const conversation = new Emails({
                agentName,
                agentEmail,
                userEmail,
                messages: messages.map(({ message }) => ({ sender: senderName, message })),
            });
            await conversation.save();

            // Send email notification for each message
            for (const { message } of messages) {
                const mailOptions = {
                    from: agentEmail,
                    to: userEmail,
                    subject: 'New Message from ' + agentName,
                    text: message
                };

                await transporter.sendMail(mailOptions);
            }

            res.status(201).json(conversation);
        } else if (loggedInUser == "user") {
            const { messages } = req.body;
            const userName = req.user.name;
            const userEmail = req.user.email;

            const conversation = new Emails({
                userName,
                userEmail,
                messages: messages.map(({ message }) => ({ sender: senderName, message })),
            });

            // await conversation.save();
            // for (const { message } of messages) {
            //     const mailOptions = {
            //         from: userEmail,
            //         to: agentEmail,
            //         subject: 'New Message from ' + agentName,
            //         text: message
            //     };

            //     await transporter.sendMail(mailOptions);
            // }

            res.status(201).json(conversation);
        } else {
            res.status(400).json({ error: 'Invalid user type' });
        }
    } catch (error) {
        console.error('Error in createEmail:', error);
        res.status(400).json({ error: error.message });
    }
}

// Get all conversations "works"
async function getAllConversations(req, res) {
    try {
        const conversations = await Emails.find({});
        console.log('Retrieved Conversations:', conversations);
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a specific conversation by ID "works"
async function getConversationById(req, res) {
    try {
        const conversation = await Emails.findById(req.params.id);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function replyMessages(req, res) {
    try {
        const toMail = req.body.toMail; // Recipient's email
        const senderMail = req.user.email; // Sender's email (logged-in user)
        const loggedInUser = req.user.role; // User's role
        const newMessageContent = req.body.message; // New message content
        const senderName = req.user.name; // Sender's name

        let query = {};
        if (loggedInUser === "agent" || loggedInUser === "admin") {
            query = { userEmail: toMail, agentEmail: senderMail };
        } else if (loggedInUser === "user") {
            query = { agentEmail: toMail, userEmail: senderMail };
        }

        const conversation = await Emails.findOne(query);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found or not assigned to this user' });
        }

        const newMessage = { sender: senderName, message: newMessageContent };
        conversation.messages.push(newMessage);
        const updatedConversation = await conversation.save();
        // Email sending logic
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: senderMail, // Using the sender's email
                pass: "grtrdrwufhoilhll" // Replace with your Gmail App Password
            },
            secure: true
        });

        const mailOptions = {
            from: senderMail,
            to: toMail,
            subject: 'New Message from ' + senderName,
            text: newMessageContent
        };


        await transporter.sendMail(mailOptions);
        res.status(200).json(updatedConversation);
    } catch (error) {
        console.error('Error in replyMessages:', error);
        res.status(400).json({ error: error.message });
    }
}



// Delete a conversation by ID "works"
async function deleteConversation(req, res) {
    try {
        const conversation = await Emails.findByIdAndDelete(req.params.id);
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

        const messages = await Emails.find({ userId });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createEmail,
    getAllConversations,
    getConversationById,
    replyMessages,
    deleteConversation,
    receiveMessage
};

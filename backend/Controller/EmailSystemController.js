const logger = require('../Controller/loggerController'); // Adjust the path accordingly
const Emails = require('../Models/emailSystemModelSchema');
const nodemailer = require('nodemailer');

// Create a new email and get notifications to user Gmail "works"
async function createEmail(req, res) {
    try {
        const loggedInUser = req.user.role;
        const senderName = req.user.name;
        logger.info('Attempting to create email conversation');

        if (loggedInUser.includes("agent") || loggedInUser.includes("admin")) {
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

            logger.info('Email conversation created successfully');
            res.status(201).json(conversation);
        } else if (loggedInUser.includes("user")) {
            const { messages } = req.body;
            const userName = req.user.name;
            const userEmail = req.user.email;

            const conversation = new Emails({
                userName,
                userEmail,
                messages: messages.map(({ message }) => ({ sender: senderName, message })),
            });

            await conversation.save();

            // TODO: Add email sending logic for users if needed
            // Example: sendEmailToUser(userEmail, 'New Message', 'You have a new message.');

            logger.info('Email conversation created successfully for user');
            res.status(201).json(conversation);
        } else {
            logger.error('Invalid user type');
            res.status(400).json({ error: 'Invalid user type' });
        }
    } catch (error) {
        logger.error(`Error in createEmail: ${error.message}`);
        console.error('Error in createEmail:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Get all user emails messages by email "works"
async function getUserEmailsMessages(req, res) {
    try {
        const userEmail = req.user.email;
        logger.info(`Attempting to retrieve email messages for user: ${userEmail}`);

        const conversation = await Emails.findOne({ userEmail: userEmail });

        if (!conversation) {
            logger.error('No conversation found for the user');
            return res.status(404).json({ message: 'No conversation found for the user' });
        }

        const messages = conversation.messages.map(({ sender, message, timestamp }) => ({ sender, message, timestamp }));

        logger.info('Retrieved email messages successfully');
        res.status(200).json({ messages });
    } catch (error) {
        logger.error(`Error retrieving email messages: ${error.message}`);
        console.error('Error retrieving email messages:', error);
        res.status(500).json({ error: error.message });
    }
}

// Get all user emails "updated"
async function getUserEmails(req, res) {
    try {
        const loggedInUser = req.user.role;
        logger.info('Attempting to retrieve user emails');

        if (loggedInUser.includes("agent") || loggedInUser.includes("admin")) {
            // Fetch emails for agents
            const conversations = await Emails.find({ agentEmail: req.user.email });
            res.status(200).json(conversations);
        } else if (loggedInUser.includes("user")) {
            // Fetch emails for users
            const userEmail = req.user.email;
            const conversations = await Emails.find({ userEmail: userEmail });
            res.status(200).json(conversations);
        } else {
            logger.error('Invalid user type');
            res.status(400).json({ error: 'Invalid user type' });
        }
    } catch (error) {
        logger.error(`Error retrieving user emails: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

// Get a specific email by ID "works"
async function getEmailById(req, res) {
    try {
        const conversation = await Emails.findById(req.params.id);
        if (!conversation) {
            logger.error('Conversation not found');
            return res.status(404).json({ error: 'Conversation not found' });
        }
        logger.info('Retrieved email by ID successfully');
        res.status(200).json(conversation);
    } catch (error) {
        logger.error(`Error retrieving email by ID: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

// Reply to messages and send mail to user "works"
async function replyMessages(req, res) {
    try {
        const toMail = req.body.toMail;
        const senderMail = req.user.email;
        const loggedInUser = req.user.role;
        logger.info('Attempting to reply to email messages');

        const newMessageContent = req.body.message;
        const senderName = req.user.name;

        let query = {};
        let shouldSendEmail = false;

        if (loggedInUser[0] === "agent" || loggedInUser[0] === "admin") {
            query = { userEmail: toMail, agentEmail: "agent.se.project@gmail.com" };
            shouldSendEmail = true;
        } else if (loggedInUser[0] === "user") {
            query = { agentEmail: "agent.se.project@gmail.com", userEmail: senderMail };
        }

        const conversation = await Emails.findOne(query);
        if (!conversation) {
            logger.error('Conversation not found or not assigned to this user');
            return res.status(404).json({ error: 'Conversation not found or not assigned to this user' });
        }

        const newMessage = { sender: senderName, message: newMessageContent };
        conversation.messages.push(newMessage);
        await conversation.save();

        if (shouldSendEmail) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: senderMail,
                    pass: "grtrdrwufhoilhll"
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
        }

        logger.info('Replied to email messages successfully');
        res.status(200).json(conversation);
    } catch (error) {
        logger.error(`Error in replyMessages: ${error.message}`);
        console.error('Error in replyMessages:', error);
        res.status(400).json({ error: error.message });
    }
}

// Delete a conversation by ID "works"
async function deleteConversation(req, res) {
    try {
        const conversation = await Emails.findByIdAndDelete(req.params.id);
        if (!conversation) {
            logger.error('Conversation not found');
            return res.status(404).json({ error: 'Conversation not found' });
        }
        logger.info('Email conversation deleted successfully');
        res.status(200).json({ message: 'Email conversation deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting email conversation: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createEmail,
    getUserEmails,
    getEmailById,
    replyMessages,
    deleteConversation,
    getUserEmailsMessages
};

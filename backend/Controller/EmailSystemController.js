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

// Get all user emails messages by email "works"
async function getUserEmailsMessages(req, res) {
    try {
        const userEmail = req.user.email;
        const conversation = await Emails.findOne({ userEmail: userEmail });

        if (!conversation) {
            return res.status(404).json({ message: 'No conversation found for the user' });
        }

        const messages = conversation.messages.map(({ message, timestamp }) => ({ message, timestamp }));

        console.log('Retrieved Messages:', messages);
        res.status(200).json({ messages });
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ error: error.message });
    }
}

// Get all user emails "works"
async function getUserEmails(req, res) {
    try {
        const userEmail = req.user.email;
        const conversations = await Emails.find({ userEmail: userEmail });
        console.log('Retrieved Conversations:', conversations);
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a specific email by ID "works"
async function getEmailById(req, res) {
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

// reply to messages and send mail to user "works"
async function replyMessages(req, res) {
    try {
        const toMail = req.body.toMail;
        const senderMail = req.user.email;
        const loggedInUser = req.user.role;

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

        res.status(200).json(conversation);
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


module.exports = {
    createEmail,
    getUserEmails,
    getEmailById,
    replyMessages,
    deleteConversation,
    getUserEmailsMessages
};

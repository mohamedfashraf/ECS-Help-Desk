const Ticket = require('../Models/ticektsModelSchema');
const SupportAgent = require('../Models/supportAgentModelSchema');
const Queues = require('../Models/queuesSchema');
const Issue = require('../Models/knowledgeBaseModelSchema');

async function createTicket(req, res) {
    try {
        const { description, category, subCategory, priority } = req.body;
        const user_id = req.user.userId;

        const assignedAgent = await findAvailableSupportAgent(category, priority);

        let status;
        if (assignedAgent) {
            // Support agent available, assign the ticket
            await assignTicketToAgentCreate(assignedAgent, user_id, description, category, subCategory, priority, "Pending");
            status = "Pending";
        } else {
            // No available agent, add the ticket to the appropriate priority queue
            const ticket = new Ticket({
                user_id,
                description,
                category,
                subCategory,
                priority,
                status: "Open",
                createdBy: user_id,
            });

            await addToPriorityQueue(ticket);
            await ticket.save();
            status = "Open";
        }

        res.status(201).json({
            message: "Ticket created successfully.",
            ticket: {
                user_id,
                description,
                category,
                subCategory,
                priority,
                status,
                assignedTo: assignedAgent ? assignedAgent._id : null,
                createdBy: user_id,
            },
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function addToPriorityQueue(ticket) {
    try {
        const queues = await Queues.findOne({}); // Assuming there's only one document for the queues

        switch (ticket.priority) {
            case 'High':
                queues.highQueue.push(ticket._id);
                break;
            case 'Medium':
                queues.mediumQueue.push(ticket._id);
                break;
            case 'Low':
                queues.lowQueue.push(ticket._id);
                break;
        }

        await queues.save();
    } catch (error) {
        console.error(`Error adding ticket to priority queue: ${error.message}`);
    }
}

async function removeFromPriorityQueue(ticket) {
    try {
        const queues = await Queues.findOne({});

        switch (ticket.priority) {
            case 'High':
                removeFromQueue(ticket._id, queues.highQueue);
                break;
            case 'Medium':
                removeFromQueue(ticket._id, queues.mediumQueue);
                break;
            case 'Low':
                removeFromQueue(ticket._id, queues.lowQueue);
                break;
        }

        await queues.save();
    } catch (error) {
        console.error(`Error removing ticket from priority queue: ${error.message}`);
    }
}

function removeFromQueue(ticketId, queue) {
    const ticketIndex = queue.indexOf(ticketId);
    if (ticketIndex !== -1) {
        queue.splice(ticketIndex, 1);
    }
}

async function processTicketQueues() {
    try {
        // Process each priority queue independently
        await processTicketQueue('high');
        await processTicketQueue('medium');
        await processTicketQueue('low');
    } catch (error) {
        console.error(`Error processing ticket queues: ${error.message}`);
    }
}

async function processTicketQueue(priority) {
    try {
        const queue = await Queues.findOne({}); // Assuming there's only one document for the queues
        const ticketIds = queue ? queue[priority + 'Queue'] : [];

        while (ticketIds.length > 0) {
            const ticketId = ticketIds.shift();
            const nextTicket = await Ticket.findById(ticketId);

            const nextAvailableAgent = await findAvailableSupportAgent(nextTicket.category, nextTicket.priority);

            if (nextAvailableAgent) {
                // Update the existing ticket's status to "Pending"
                nextTicket.status = "Pending";
                await nextTicket.save();

                // Assign the updated ticket to the agent
                // await assignTicketToAgentQ(nextAvailableAgent, nextTicket.user_id, nextTicket.description, nextTicket.category, nextTicket.subCategory, nextTicket.priority, nextTicket.status);
                await assignTicketToAgentQ(nextAvailableAgent, nextTicket);

                // Remove the ticket from the queue
                await removeFromPriorityQueue(nextTicket);
            } else {
                // If no available agent, add the ticket back to the queue
                ticketIds.unshift(ticketId);
                break; // Stop further processing, as we don't have any available agents
            }
        }

        await queue.save();
    } catch (error) {
        console.error(`Error processing ticket queue: ${error.message}`);
    }
}

async function assignTicketToAgentQ(agent, ticket) {
    try {
        agent.assignedTickets.push(ticket._id);
        await agent.save();
        await ticket.save();

        // Remove the ticket from the appropriate priority queue
        await removeFromPriorityQueue(ticket);

        // Check the ticket queue and assign tickets to available agents
        await processTicketQueues();
    } catch (error) {
        console.error(`Error assigning ticket to agent: ${error.message}`);
    }
}

async function assignTicketToAgentCreate(agent, user_id, description, category, subCategory, priority, status) {
    try {
        const ticket = new Ticket({
            user_id,
            description,
            category,
            subCategory,
            priority,
            status: "Pending",
            assignedTo: agent._id,
            createdBy: user_id,
        });

        agent.assignedTickets.push(ticket._id);
        await agent.save();
        await ticket.save();

        // Remove the ticket from the appropriate priority queue
        await removeFromPriorityQueue(ticket);

        // Check the ticket queue and assign tickets to available agents
        await processTicketQueues();
    } catch (error) {
        console.error(`Error assigning ticket to agent: ${error.message}`);
    }
}

async function findAvailableSupportAgent(category, priority) {
    try {
        let assignedAgent = await SupportAgent.findOne({
            [`expertise.High`]: category,
            availability: true,
        });

        if (!assignedAgent) {
            assignedAgent = await SupportAgent.findOne({
                [`expertise.${priority}`]: category,
                availability: true,
            });
        }

        if (!assignedAgent) {
            return null;
        }

        return assignedAgent;
    } catch (error) {
        console.error(`Error finding available support agent: ${error.message}`);
        return null;
    }
}

async function getAllTickets(req, res) {
    try {
        const tickets = await Ticket.find({});
        res.status(200).send(tickets);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getTicketById(req, res) {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateTicket(req, res) {
    try {
        const updates = req.body;
        const ticketId = req.params.id;

        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        // Save the current status before updating
        const currentStatus = ticket.status;

        // Update the ticket
        Object.keys(updates).forEach((update) => (ticket[update] = updates[update]));
        await ticket.save();

        // If the resolution details are updated
        if ('resolutionDetails' in updates && updates.resolutionDetails !== ticket.resolutionDetails) {
            // Create a new issue in the knowledge base
            const newIssue = new Issue({
                content: updates.resolutionDetails,
                category: ticket.category,
                keyWords: [ticket.subCategory],
            });

            await newIssue.save();
        }


        // If the status is being updated to "Closed" and the previous status was not "Closed"
        if (ticket.status === "Closed" && currentStatus !== "Closed") {
            // Check if the ticket is assigned to a support agent
            if (ticket.assignedTo) {
                // Remove the ticket from the assigned agent's assignedTickets array
                const agent = await SupportAgent.findById(ticket.assignedTo);
                if (agent) {
                    agent.assignedTickets = agent.assignedTickets.filter((agentTicketId) => agentTicketId.toString() !== ticketId);
                    await agent.save();
                }
            }

            // Check the ticket queue and assign tickets to available agents
            await processTicketQueues();
        }

        res.status(200).json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deleteTicket(req, res) {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getUserTickets(req, res) {
    try {
        const userId = req.user.userId; // Convert to ObjectId
        const tickets = await Ticket.find({ user_id: userId });
        res.status(200).send(tickets);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getAgentTickets(req, res) {
    try {
        const agentId = req.user.userId;
        const agentTickets = await Ticket.find({ assignedTo: agentId });
        res.status(200).json(agentTickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createTicket,
    getAllTickets,
    getUserTickets,
    getAgentTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
    processTicketQueues,
    findAvailableSupportAgent,
};

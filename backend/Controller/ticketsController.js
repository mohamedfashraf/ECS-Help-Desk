const Ticket = require('../Models/ticektsModelSchema');
const SupportAgent = require('../Models/supportAgentModelSchema'); // Add this import
const AutomatedWorkflow = require('../Models/automatedWorkflowsModelSchema'); // Add this import

// Add the routeAndAssignTicket function
async function routeAndAssignTicket(req, res) {
    try {
        const ticketId = req.params.id;
        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        const availableAgents = await SupportAgent.find({
            availability: true,
        });

        const assignedAgent = determineAgentBasedOnRules(ticket, availableAgents);

        ticket.assignedTo = assignedAgent;

        await ticket.save();

        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Function to determine the agent based on rules (similar to the one in the previous response)
function determineAgentBasedOnRules( ticket, availableAgents) {
    // Your logic here...
    // return availableAgents.length > 0 ? availableAgents[0]._id : null;
}







//

async function createTicket(req, res) {
    try {
        // Extracting additional fields from the request body if needed
        const { description, category, subCategory, priority, status, resolutionDetails } = req.body;

        // Assuming req.user is set after successful authentication and contains the user's information
        const user_id = req.user.userId;  // Adjusted to match the token structure

        // Find a suitable support agent based on expertise and availability
        const assignedAgent = await findAvailableSupportAgent(category, priority);

        // Create a new ticket with the assigned agent
        const ticket = new Ticket({
            user_id,
            description,
            category,
            subCategory,
            priority,
            status,
            assignedTo: assignedAgent._id,  // Assign the agent ID
            createdBy: user_id,
            resolutionDetails,
        });

        // Update the assignedTickets array in the support agent
        assignedAgent.assignedTickets.push(ticket._id);
        await assignedAgent.save();

        // Save the new ticket
        await ticket.save();

        res.status(201).json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Function to find an available support agent based on expertise and priority
async function findAvailableSupportAgent(category, priority) {
    try {
        const expertiseField = getExpertiseFieldBasedOnPriority(priority);

        // Find an available support agent with the required expertise
        const assignedAgent = await SupportAgent.findOne({
            [`expertise.${expertiseField}`]: category,
            availability: true,
        });

        if (!assignedAgent) {
            throw new Error('No available support agent found for the given category and priority.');
        }

        return assignedAgent;
    } catch (error) {
        throw new Error(`Error finding available support agent: ${error.message}`);
    }
}

// Helper function to determine the expertise field based on priority
function getExpertiseFieldBasedOnPriority(priority) {
    // Adjust this logic based on your specific requirements
    switch (priority) {
        case 'high':
            return 'High';
        case 'medium':
            return 'Medium';
        case 'low':
            return 'Low';
        default:
            throw new Error('Invalid priority');
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
        const updates = Object.keys(req.body);
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        updates.forEach((update) => ticket[update] = req.body[update]);
        await ticket.save();
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

module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
    routeAndAssignTicket
};


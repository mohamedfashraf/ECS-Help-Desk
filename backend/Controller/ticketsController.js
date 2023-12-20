const Ticket = require("../Models/ticektsModelSchema");
const SupportAgent = require("../Models/supportAgentModelSchema");

const highPriorityQueue = [];
const mediumPriorityQueue = [];
const lowPriorityQueue = [];

async function createTicket(req, res) {
  try {
    const { description, category, subCategory, priority } = req.body;
    const user_id = req.user.userId;

    const assignedAgent = await findAvailableSupportAgent(category, priority);

    let status;
    if (assignedAgent) {
      // Support agent available, assign the ticket
      await assignTicketToAgent(
        assignedAgent,
        user_id,
        description,
        category,
        subCategory,
        priority,
        "Pending"
      );
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

      addToPriorityQueue(ticket);
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

function addToPriorityQueue(ticket) {
  switch (ticket.priority) {
    case "High":
      highPriorityQueue.push(ticket);
      break;
    case "Medium":
      mediumPriorityQueue.push(ticket);
      break;
    case "Low":
      lowPriorityQueue.push(ticket);
      break;
  }
  return {
    highPriority: [...highPriorityQueue],
    mediumPriority: [...mediumPriorityQueue],
    lowPriority: [...lowPriorityQueue],
  };
}

function removeFromPriorityQueue(ticket) {
  switch (ticket.priority) {
    case "High":
      removeFromQueue(ticket, highPriorityQueue);
      break;
    case "Medium":
      removeFromQueue(ticket, mediumPriorityQueue);
      break;
    case "Low":
      removeFromQueue(ticket, lowPriorityQueue);
      break;
  }
}

function removeFromQueue(ticket, queue) {
  queue = queue.filter(
    (queueTicket) => queueTicket._id.toString() !== ticket._id.toString()
  );
}

async function processTicketQueues() {
  // Process each priority queue independently
  await processTicketQueue(highPriorityQueue);
  await processTicketQueue(mediumPriorityQueue);
  await processTicketQueue(lowPriorityQueue);
}

async function processTicketQueue(queue) {
  // Check if there are tickets in the queue and assign them to available agents
  while (queue.length > 0) {
    const nextTicket = queue.shift();
    const nextAvailableAgent = await findAvailableSupportAgent(
      nextTicket.category,
      nextTicket.priority
    );

    if (nextAvailableAgent) {
      await assignTicketToAgent(
        nextAvailableAgent,
        nextTicket.user_id,
        nextTicket.description,
        nextTicket.category,
        nextTicket.subCategory,
        nextTicket.priority,
        nextTicket.status,
        nextTicket.resolutionDetails
      );
    } else {
      // If no available agent, add the ticket back to the queue
      queue.unshift(nextTicket);
      break; // Stop further processing, as we don't have any available agents
    }
  }
}

async function assignTicketToAgent(
  agent,
  user_id,
  description,
  category,
  subCategory,
  priority,
  status,
  resolutionDetails
) {
  const ticket = new Ticket({
    user_id,
    description,
    category,
    subCategory,
    priority,
    status: "Pending",
    assignedTo: agent._id,
    createdBy: user_id,
    resolutionDetails,
  });

  agent.assignedTickets.push(ticket._id);
  await agent.save();
  await ticket.save();

  // Remove the ticket from the appropriate priority queue
  removeFromPriorityQueue(ticket);

  // Check the ticket queue and assign tickets to available agents
  await processTicketQueues();
}

// The rest of your findAvailableSupportAgent function remains unchanged
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
    Object.keys(updates).forEach(
      (update) => (ticket[update] = updates[update])
    );
    await ticket.save();

    // If the status is being updated to "Closed" and the previous status was not "Closed"
    if (ticket.status === "Closed" && currentStatus !== "Closed") {
      // Check if the ticket is assigned to a support agent
      if (ticket.assignedTo) {
        // Remove the ticket from the assigned agent's assignedTickets array
        const agent = await SupportAgent.findById(ticket.assignedTo);
        if (agent) {
          agent.assignedTickets = agent.assignedTickets.filter(
            (agentTicketId) => agentTicketId.toString() !== ticketId
          );
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

///////////homa el 2 dol ya ashraffffffffff
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
  processTicketQueue, // Exporting the function for external use
  findAvailableSupportAgent, // Exporting the function for testing or other use
};

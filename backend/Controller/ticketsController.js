const Ticket = require('../Models/ticektsModelSchema');

async function createTicket(req, res) {
    try {
        const { user_id, description, category, subCategory, priority, status, assignedTo, createdBy, resolutionDetails } = req.body;
        const ticket = new Ticket({ user_id, description, category, subCategory, priority, status, assignedTo, createdBy, resolutionDetails });
        await ticket.save();
        res.status(201).json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
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
};

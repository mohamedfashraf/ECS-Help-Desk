const SupportAgent = require('../Models/supportAgentModelSchema');

// Create a new support agent "works"
async function createSupportAgent(req, res) {
    try {
        const { name, email, password, specialization } = req.body;
        const supportAgent = new SupportAgent({ name, email, password, specialization });
        await supportAgent.save();
        res.status(201).json(supportAgent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get all support agents "works"
async function getAllSupportAgents(req, res) {
    try {
        const supportAgents = await SupportAgent.find({});
        res.status(200).json(supportAgents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a support agent by ID "works"
async function getSupportAgentById(req, res) {
    try {
        const supportAgent = await SupportAgent.findById(req.params.id);
        if (!supportAgent) {
            return res.status(404).json({ error: 'Support agent not found' });
        }
        res.status(200).json(supportAgent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a support agent by ID "works"
async function updateSupportAgent(req, res) {
    try {
        const updates = Object.keys(req.body);
        const supportAgent = await SupportAgent.findById(req.params.id);
        if (!supportAgent) {
            return res.status(404).json({ error: 'Support agent not found' });
        }
        updates.forEach((update) => (supportAgent[update] = req.body[update]));
        await supportAgent.save();
        res.status(200).json(supportAgent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete a support agent by ID "works"
async function deleteSupportAgent(req, res) {
    try {
        const supportAgent = await SupportAgent.findByIdAndDelete(req.params.id);
        if (!supportAgent) {
            return res.status(404).json({ error: 'Support agent not found' });
        }
        res.status(200).json({ message: 'Support agent deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createSupportAgent,
    getAllSupportAgents,
    getSupportAgentById,
    updateSupportAgent,
    deleteSupportAgent,
};

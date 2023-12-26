const logger = require('../Controller/loggerController'); // Adjust the path accordingly
const SupportAgent = require('../Models/supportAgentModelSchema');

// Create a new support agent
async function createSupportAgent(req, res) {
    try {
        const { name, email, password, expertise } = req.body;
        const supportAgent = new SupportAgent({ name, email, password, expertise });

        await supportAgent.save();
        logger.info('Support agent created successfully');
        res.status(201).json(supportAgent);
    } catch (error) {
        logger.error(`Error creating support agent: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
}

// Get all support agents
async function getAllSupportAgents(req, res) {
    try {
        const supportAgents = await SupportAgent.find({});
        logger.info('Retrieved all support agents successfully');
        res.status(200).json(supportAgents);
    } catch (error) {
        logger.error(`Error retrieving all support agents: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

// Get a support agent by ID
async function getSupportAgentById(req, res) {
    try {
        const supportAgent = await SupportAgent.findById(req.params.id);
        if (!supportAgent) {
            logger.warn('Support agent not found');
            return res.status(404).json({ error: 'Support agent not found' });
        }
        logger.info('Retrieved support agent by ID successfully');
        res.status(200).json(supportAgent);
    } catch (error) {
        logger.error(`Error retrieving support agent by ID: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

// Update a support agent by ID
async function updateSupportAgent(req, res) {
    try {
        const updates = Object.keys(req.body);
        const supportAgent = await SupportAgent.findById(req.params.id);
        if (!supportAgent) {
            logger.warn('Support agent not found for updating');
            return res.status(404).json({ error: 'Support agent not found' });
        }
        updates.forEach((update) => (supportAgent[update] = req.body[update]));
        await supportAgent.save();
        logger.info('Support agent updated successfully');
        res.status(200).json(supportAgent);
    } catch (error) {
        logger.error(`Error updating support agent: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
}

// Delete a support agent by ID
async function deleteSupportAgent(req, res) {
    try {
        const supportAgent = await SupportAgent.findByIdAndDelete(req.params.id);
        if (!supportAgent) {
            logger.warn('Support agent not found for deletion');
            return res.status(404).json({ error: 'Support agent not found' });
        }
        logger.info('Support agent deleted successfully');
        res.status(200).json({ message: 'Support agent deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting support agent: ${error.message}`);
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

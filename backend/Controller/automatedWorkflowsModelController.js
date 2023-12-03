const mongoose = require('mongoose');
const AutomatedWorkflow = require('../Models/automatedWorkflowsModelSchema');

// Create new automated workflow  WORKINGGGGGGGGGGGGGGGGG
async function createAutomatedWorkflow(req, res) {
    try {
        const {
            agentAvailability,
            workflowType,
            workflowDetails: { priorityLevels, routingRules, escalationPath }
        } = req.body;

        const automatedWorkflow = new AutomatedWorkflow({
            agentAvailability,
            workflowType,
            workflowDetails: {
                priorityLevels,
                routingRules,
                escalationPath
            }
        });

        await automatedWorkflow.save();
        res.status(201).json(automatedWorkflow);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get all automated workflows WORKINGGGGGGGGGGGGGGGGGGG
async function getAllAutomatedWorkflows(req, res) {
    try {
        const automatedWorkflows = await AutomatedWorkflow.find({});
        res.status(200).json(automatedWorkflows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get specific automated workflow by ID  WORKINGGGGGGGGGGGGGGG
async function getAutomatedWorkflowById(req, res) {
    try {
        const automatedWorkflow = await AutomatedWorkflow.findById(req.params.id);
        if (!automatedWorkflow) {
            return res.status(404).json({ error: 'Automated workflow not found' });
        }
        res.status(200).json(automatedWorkflow);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update an automated workflow by ID  WORKINGGGGGGGGGGGGGGGG
async function updateAutomatedWorkflow(req, res) {
    try {
        const updates = Object.keys(req.body);
        const automatedWorkflow = await AutomatedWorkflow.findById(req.params.id);
        if (!automatedWorkflow) {
            return res.status(404).json({ error: 'Automated workflow not found' });
        }
        updates.forEach((update) => (automatedWorkflow[update] = req.body[update]));
        await automatedWorkflow.save();
        res.status(200).json(automatedWorkflow);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete an automated workflow by ID WORKINGGGGGGGGGGGGGGGGGGGGGG
async function deleteAutomatedWorkflow(req, res) {
    try {
        const automatedWorkflow = await AutomatedWorkflow.findByIdAndDelete(req.params.id);
        if (!automatedWorkflow) {
            return res.status(404).json({ error: 'Automated workflow not found' });
        }
        res.status(200).json({ message: 'Automated workflow deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createAutomatedWorkflow,
    getAllAutomatedWorkflows,
    getAutomatedWorkflowById,
    updateAutomatedWorkflow,
    deleteAutomatedWorkflow
};

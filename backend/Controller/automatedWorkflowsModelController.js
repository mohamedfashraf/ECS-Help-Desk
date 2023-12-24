// automatedWorkflowController.js
const logger = require('../Controller/loggerController'); // Adjust the path accordingly
const AutomatedWorkflow = require('../Models/automatedWorkflowsModelSchema');

async function createAutomatedWorkflow(req, res) {
  try {
    const {
      agentAvailability,
      workflowType,
      workflowDetails: { priorityLevels, routingRules, escalationPath },
    } = req.body;

    const automatedWorkflow = new AutomatedWorkflow({
      agentAvailability,
      workflowType,
      workflowDetails: {
        priorityLevels,
        routingRules,
        escalationPath,
      },
    });

    await automatedWorkflow.save();
    res.status(201).json(automatedWorkflow);
  } catch (error) {
    logger.error(`Error creating automated workflow: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
}

async function getAllAutomatedWorkflows(req, res) {
  try {
    const automatedWorkflows = await AutomatedWorkflow.find({});
    res.status(200).json(automatedWorkflows);
  } catch (error) {
    logger.error(`Error getting all automated workflows: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}

async function getAutomatedWorkflowById(req, res) {
  try {
    const automatedWorkflow = await AutomatedWorkflow.findById(req.params.id);
    if (!automatedWorkflow) {
      return res.status(404).json({ error: 'Automated workflow not found' });
    }
    res.status(200).json(automatedWorkflow);
  } catch (error) {
    logger.error(`Error getting automated workflow by ID: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}

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
    logger.error(`Error updating automated workflow by ID: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
}

async function deleteAutomatedWorkflow(req, res) {
  try {
    const automatedWorkflow = await AutomatedWorkflow.findByIdAndDelete(req.params.id);
    if (!automatedWorkflow) {
      return res.status(404).json({ error: 'Automated workflow not found' });
    }
    res.status(200).json({ message: 'Automated workflow deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting automated workflow by ID: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createAutomatedWorkflow,
  getAllAutomatedWorkflows,
  getAutomatedWorkflowById,
  updateAutomatedWorkflow,
  deleteAutomatedWorkflow,
};

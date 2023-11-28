const automatedWorkflowsModel = require('../Models/automatedWorkflowsModelSchema'); // Update with the correct path

// Create Function
async function createWorkflow(req, res) {
    try {
        const newWorkflow = new automatedWorkflowsModel(req.body);
        const savedWorkflow = await newWorkflow.save();
        res.status(201).json(savedWorkflow);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Read Function
async function getWorkflow(req, res) {
    try {
        const workflow = await automatedWorkflowsModel.findById(req.params.id);
        if (!workflow) {
            return res.status(404).json({ message: 'Workflow not found' });
        }
        res.json(workflow);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update Function
async function updateWorkflow(req, res) {
    try {
        const updatedWorkflow = await automatedWorkflowsModel.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        if (!updatedWorkflow) {
            return res.status(404).json({ message: 'Workflow not found' });
        }
        res.json(updatedWorkflow);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete Function
async function deleteWorkflow(req, res) {
    try {
        const deletedWorkflow = await automatedWorkflowsModel.findByIdAndDelete(req.params.id);
        if (!deletedWorkflow) {
            return res.status(404).json({ message: 'Workflow not found' });
        }
        res.json({ message: 'Workflow deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createWorkflow, getWorkflow, updateWorkflow, deleteWorkflow };

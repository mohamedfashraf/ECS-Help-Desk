

// Controller actions
const getAllAutomatedWorkflows = (req, res) => {
  res.json(automatedWorkflows);
};

const createAutomatedWorkflow = (req, res) => {
  const newWorkflow = req.body;
  automatedWorkflows.push(newWorkflow);
  res.status(201).json(newWorkflow);
};

const getAutomatedWorkflowById = (req, res) => {
  const workflowId = req.params.id;
  const workflow = automatedWorkflows.find(workflow => workflow._id.$oid === workflowId);
  if (workflow) {
    res.json(workflow);
  } else {
    res.status(404).json({ message: "Workflow not found" });
  }
};

const updateAutomatedWorkflow = (req, res) => {
  const workflowId = req.params.id;
  const updatedWorkflow = req.body;
  const workflowIndex = automatedWorkflows.findIndex(workflow => workflow._id.$oid === workflowId);
  if (workflowIndex !== -1) {
    automatedWorkflows[workflowIndex] = updatedWorkflow;
    res.json(updatedWorkflow);
  } else {
    res.status(404).json({ message: "Workflow not found" });
  }
};

const deleteAutomatedWorkflow = (req, res) => {
  const workflowId = req.params.id;
  const workflowIndex = automatedWorkflows.findIndex(workflow => workflow._id.$oid === workflowId);
  if (workflowIndex !== -1) {
    automatedWorkflows.splice(workflowIndex, 1);
    res.json({ message: "Workflow deleted" });
  } else {
    res.status(404).json({ message: "Workflow not found" });
  }
};

// Export controller actions
module.exports = {
  getAllAutomatedWorkflows,
  createAutomatedWorkflow,
  getAutomatedWorkflowById,
  updateAutomatedWorkflow,
  deleteAutomatedWorkflow
};

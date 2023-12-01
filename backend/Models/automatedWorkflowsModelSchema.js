const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const automatedWorkflowsModelSchema = new Schema({
  priorityLevels: {
    type: [String],
    enum: ["High", "Medium", "Low"],
  },
  routingRules: {
    High: String,
    Medium: String,
    Low: String,
  },
  escalationPath: [String],
});

const TicketRoutingSchema = new Schema({
  _id: Schema.Types.ObjectId,
  agentAvailability: Boolean,
  workflowType: {
    type: String,
    default: "Ticket Routing",
  },
  workflowDetails: automatedWorkflowsModelSchema,
});
const TicketRouting = mongoose.model("automatedWorkflowsModel", automatedWorkflowsModelSchema);

module.exports = TicketRouting;

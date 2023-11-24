const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkflowDetailsSchema = new Schema({
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
  workflowDetails: WorkflowDetailsSchema,
});
const TicketRouting = mongoose.model("TicketRouting", TicketRoutingSchema);

module.exports = TicketRouting;

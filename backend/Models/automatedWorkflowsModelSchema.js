const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const automatedWorkflowsModelSchema = new Schema({
  priorityLevels: {
    type: [String],
    enum: ["High", "Medium", "Low"],
  },


  routingRules: {
    High: {
      type: [String],
      required: true
  },
    Medium: {
      type: [String],
      required: true
  },
    Low:{
      type: [String],
      required: true
  }
  },


  escalationPath:{
    type: [String],
    required: true
  }
});

const TicketRoutingSchema = new Schema({
  agentAvailability: {
    type: Boolean,
    required: true
},
  workflowType: {
    type: String,
    default: "Ticket Routing",
    required: true
  },
  workflowDetails: automatedWorkflowsModelSchema,
});
const TicketRouting = mongoose.model("automatedWorkflows", TicketRoutingSchema);

module.exports = TicketRouting;

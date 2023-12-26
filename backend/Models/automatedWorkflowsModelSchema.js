const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const automatedWorkflowsModelSchema = new Schema({
  issueType: {
    type: String,
    required: true
  },


  subCategory: {
      type: String,
      required: true
  },

  workflow:{
    type: String,
    required: true
  }
});

const automatedWorkflows = mongoose.model("automatedWorkflows", automatedWorkflowsModelSchema);

module.exports = automatedWorkflows;

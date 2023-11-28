const mongoose = require('mongoose');

const supportAgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'support_agent',
    enum: ['support_agent']
  },
  specialization: {
    type: String,
    enum: ['Software', 'Hardware', 'Network'],
    required: true
  },
  assignedTickets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket'
  }],
  // Remove default values for createdAt and updatedAt
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

const SupportAgent = mongoose.model('SupportAgent', supportAgentSchema);

module.exports = SupportAgent;

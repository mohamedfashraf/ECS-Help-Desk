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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const SupportAgent = mongoose.model('SupportAgent', supportAgentSchema);

module.exports = SupportAgent;

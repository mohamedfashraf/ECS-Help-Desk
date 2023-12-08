const mongoose = require('mongoose');

const supportAgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'support_agent',
    enum: ['support_agent'],
  },
  expertise: {
    High: {
      type: String,
      required: true
  },
    Medium: {
      type: String,
      required: true
  },
    Low:{
      type: String,
      required: true
  }
  },
  assignedTickets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
  }],
  availability: {
    type: Boolean,
  },
  // Remove default values for createdAt and updatedAt
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  }
});

// Pre-save middleware to set availability based on assignedTickets length
supportAgentSchema.pre('save', function (next) {
  this.availability = this.assignedTickets.length < 5;
  next();
});

const SupportAgent = mongoose.model('SupportAgent', supportAgentSchema);

module.exports = SupportAgent;
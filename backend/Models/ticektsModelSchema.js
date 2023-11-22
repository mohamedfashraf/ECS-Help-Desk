const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Software', 'Hardware', 'Network'],
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resolutionDetails: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;

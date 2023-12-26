const mongoose = require('mongoose');

const queuesSchema = new mongoose.Schema({
    highQueue: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
      }],
    mediumQueue:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
      }],
    lowQueue:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
      }],
   
},
);

const queuesModel = mongoose.model('Queue', queuesSchema);

module.exports = queuesModel;

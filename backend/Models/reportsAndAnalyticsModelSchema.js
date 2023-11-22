const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the main document schema
const ReportSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    type: {
        type: String,
        required: true // If type is always required. If not, remove this line.
    },
    generatedBy: {
        type: Schema.Types.ObjectId,
        required: true
    },
    generatedAt: {
        type: Date,
        default: Date.now
    }
});

// Compile the model from the schema
const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;

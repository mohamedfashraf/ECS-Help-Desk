const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    type: {
        type: String,
        required: true
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

const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;

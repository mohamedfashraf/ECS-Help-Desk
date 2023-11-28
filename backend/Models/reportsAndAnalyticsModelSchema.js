const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
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

const Report = mongoose.model('reportsAndAnalyticsModelSchema', ReportSchema);

module.exports = Report;

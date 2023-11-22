const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the main document schema
const IssueSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        default: ' ' // Assuming space is intentional as default content.
    },
    category: {
        type: String,
        enum: ['Network Issue', /* other categories if any */],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    keyWords: [String]
});

// Compile the model from the schema
const Issue = mongoose.model('Issue', IssueSchema);

module.exports = Issue;

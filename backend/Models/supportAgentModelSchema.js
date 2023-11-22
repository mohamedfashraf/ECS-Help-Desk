const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the main document schema
const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    primaryResponsibility: {
        type: String,
        enum: ['Software', 'Hardware', 'Network']
    }
});

// Compile the model from the schema
const User = mongoose.model('User', UserSchema);

module.exports = User;

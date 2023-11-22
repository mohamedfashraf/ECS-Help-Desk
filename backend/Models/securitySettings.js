const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sensitive_data_protection: {
        type: Boolean,
        required: true
    },
    data_backup_enabled: {
        type: Boolean,
        required: true
    },
    recovery_procedures: {
        type: String,
        required: true
    },
    MFA_enabled: {
        type: Boolean,
        required: true
    }
});

const Ticket = mongoose.model('Security', securitySettings);

module.exports = Security;
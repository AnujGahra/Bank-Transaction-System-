const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Account must be associated with a user"],
        index: true
    },
    status: {
        enum: {
            values: ['ACTIVE', 'FROZEN', 'CLOSED'],
            message: "Status must be either ACTIVE, FROZEN, or CLOSED"
        }
    },
    currency: {
        type: String,
        required: [true, "Currency is required for creating an account"],
        uppercase: true,
        default: 'INR'
    }

}, { timestamps: true });

accountModel.index({ user: 1, status: 1 });

const accountModel = mongoose.model('Account', accountSchema);

module.exports = accountModel;
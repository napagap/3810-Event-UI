const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    eventCode: { 
        type: String, 
        required: true, 
        uppercase: true 
    },
    userName: { 
        type: String, 
        required: true 
    },
    status: {
        type: String,
        enum: ['Confirmed', 'Cancelled'],
        default: 'Confirmed'
    },
    registeredAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Registration', registrationSchema);
const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain'
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    duration: {
        type: Number // in seconds
    },
    distance: {
        type: Number // in meters
    },
    vehicleType: {
        type: String,
        enum: ['car', 'motorcycle', 'auto'],
        required: true
    },
    otp: {
        type: String,
        required: true,
        select: false
    }
}, { timestamps: true });

module.exports = mongoose.model('ride', rideSchema);

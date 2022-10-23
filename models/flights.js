const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flightsSchema = new Schema({

    flightCode: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
        default: 'NT'
        // NT - No time
    },
    flightState: {
        type: String,
        enum: ['delayed', 'on time', 'landed', 'cancelled']
    },
    company: {
        type: String,
        required: true
    }
});

const Flight = mongoose.model('Flight', flightsSchema);

module.exports = { Flight };

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flightsSchema = new Schema({

    flightCode: {
        type: Number,
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
        required: true
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

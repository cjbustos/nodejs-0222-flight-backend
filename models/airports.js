const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const airportSchema = new Schema({

    icao_code: {
        type: String,
        required: true
    },
    iata_code: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['small', 'medium', 'large', 'heliport']
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

const Airport = mongoose.model('Airport', airportSchema);

module.exports = { Airport };
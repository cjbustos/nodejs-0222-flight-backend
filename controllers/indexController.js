const { Flight } = require('../models/flights');
const { Airport } = require('../models/airports');
const { validationResult } = require('express-validator');
const axios = require('axios');

const indexController = (req, res) => {
    res.send('Flight API V1.0.1');
};

const getAllFlights = async (req, res) => {
    const flights = await Flight.find();
    res.status(200).json(flights);
};

const getFlightById = async (req, res) => {
    const flight = await Flight.findById(req.params.id);
    res.status(200).json(flight);
}

const getFlightByParam = async (req, res) => {

    try {
        const obj = {
            to: '',
            airport: '' || 'ND',
            temp: '' || 'ND',
            flightState: '',
            company: ''
        }

        const flight = await Flight.findOne({ flightCode: req.params.flightCode });
        const airport = await Airport.findOne({ city: flight.to });

        if (airport !== null) {

            let info = await getAdditionalData(airport.iata_code);

            obj.to = flight.to;
            obj.airport = airport.name;
            obj.temp = info.temp;
            obj.flightState = flight.flightState;
            obj.company = flight.company;

            res.status(200).json({ data: obj });
        } else {
            obj.to = flight.to;
            obj.flightState = flight.flightState;
            obj.company = flight.company;

            res.status(200).json({ data: obj });
        };
    } catch (error) {
        res.status(400).json({ msg: 'flight code is wrong!' });
    };
};

const addFlight = async (req, res) => {
    try {
        const err = validationResult(req);
        if (err.isEmpty()) {
            const flight = new Flight(req.body);
            await flight.save();
            res.status(201).json({ flight });
        } else {
            res.status(501).json(err);
        }
    } catch (error) {
        res.status(501).json({
            msg: error
        })
    }
};

const updateFlight = async (req, res) => {
    try {
        const err = validationResult(req);
        if (err.isEmpty()) {
            await Flight.findByIdAndUpdate(req.params.id, req.body);
            res.status(201).json({ msg: "Update successful!" });
        } else {
            res.status(501).json(err);
        }
    } catch (error) {
        res.status(501).json({
            msg: error
        })
    };
};

const deleteFlight = async (req, res) => {
    try {
        await Flight.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Delete successful!" });
    } catch (error) {
        res.status(501).json(error);
    }
};

const getAllFlightData = async (req, res) => {
    try {
        let info = await getAdditionalData(req.params.code);
        res.status(200).json({ info });
    } catch (err) {
        res.json({ status: err.response.status, data: err.response.data })
    };
};

const getAdditionalData = async (code) => {
    const baseURL = 'https://airlabs.co/api/v9/airports';
    const apiKey = 'dd50ec33-092e-4e42-b194-6358011d8950';

    let info = {
        airport: '',
        temp: ''
    };

    try {
        const res = await axios.get(baseURL + `?country_code=AR&iata_code=${code}&api_key=${apiKey}`);
        if (res.data.response !== undefined) {
            const [{ name, lat, lng }] = res.data.response;
            info.airport = name;
            let temp = await getWeather(lat, lng);
            info.temp = temp;
        }
        return info;
    } catch (error) {
        console.error(error);
        return info;
    };
};

const getWeather = async (lat, lng) => {
    const baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services';
    const apiKey = 'FR7CG4Q4CVGBSHAQURG5YTN7T';
    let temp = '';
    try {
        const res = await axios.get(baseURL + `/timeline/${lat}%2C${lng}?unitGroup=metric&key=${apiKey}&contentType=json`);
        temp = res.data.currentConditions.temp;
        return temp;
    } catch (error) {
        console.error(error);
        return temp;
    }
};

const addAirport = async (req, res) => {
    try {
        const err = validationResult(req);
        if (err.isEmpty()) {
            const airport = new Airport(req.body);
            await airport.save();
            res.status(201).json({ airport });
        } else {
            res.status(501).json({ err });
        };
    } catch (error) {
        res.status(501).json({
            msg: error
        });
    };
};

const getAllAirports = async (req, res) => {
    const airports = await Airport.find();
    res.status(200).json({ airports });
};

const deleteAirport = async (req, res) => {
    try {
        await Flight.findByIdAndDelete(req.params.code);
        res.status(200).json({ msg: "Delete successful!" });
    } catch (error) {
        res.status(501).json(error);
    }
};

const controllers = {
    index: indexController,
    allFlights: getAllFlights,
    flightById: getFlightById,
    flightByParam: getFlightByParam,
    allFlightData: getAllFlightData,
    addFlight: addFlight,
    updateFlight: updateFlight,
    deleteFlight: deleteFlight,
    allAirports: getAllAirports,
    addAirport: addAirport,
    deleteAirport: deleteAirport
}

module.exports = { controllers }
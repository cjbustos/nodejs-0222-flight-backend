const { Flight } = require('../models/flights');
const { validationResult } = require('express-validator');
const axios = require('axios');

const indexController = (req, res) => {
    res.send('Hello from server!');
};

const viewAll = async (req, res) => {
    const flights = await Flight.find();
    res.status(200).json({ flights });
};

const getFlightById = async (req, res) => {
    const flight = await Flight.findById(req.params.id);
    res.status(200).json({ flight });
}

const getFlightByParam = async (req, res) => {
    const flight = await Flight.findOne({ flightCode: req.params.flightCode });
    res.status(200).json({ flight });
}

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
            res.status(201).json({ msg: "Update success!" });
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
        res.status(200).json({ msg: "Delete successfully!" });
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
        if(res.data.response !== undefined){
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

// Before save must call api for airport name, after save with data. Before response build with weather data, previously call api with lat and long data. 
// https://airportcodes.io/en/country/argentina/
// https://airlabs.co/api/v9/airports?country_code=AR&iata_code=EQS&api_key=dd50ec33-092e-4e42-b194-6358011d8950
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/esquel?unitGroup=metric&key=FR7CG4Q4CVGBSHAQURG5YTN7T&contentType=json
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/-42.908558%2C-71.140491?unitGroup=metric&key=FR7CG4Q4CVGBSHAQURG5YTN7T&contentType=json

module.exports = { indexController, viewAll, getFlightById, getFlightByParam, addFlight, updateFlight, deleteFlight, getAllFlightData }
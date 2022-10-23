const express = require('express');
const router = express.Router();
const { indexController, getAllFlights, getFlightById, getFlightByParam, getAllFlightData, addFlight, updateFlight, deleteFlight, getAllAirports, addAirport, deleteAirport } = require('../controllers/indexController');
const { validateId } = require('../middlewares/validateId');
const { check, body } = require('express-validator');

router.get('/', indexController);

// Flights data
router.get('/flights', getAllFlights);

router.post('/add-flight', [
    check('flightCode').not().isEmpty().withMessage("The field flightCode is empty!"),
    check('from').not().isEmpty().withMessage("The field from is empty!"),
    check('to').not().isEmpty().withMessage("The field to is empty!"),
    check('date').not().isEmpty().withMessage("The field date is empty!"),
    check('flightState').not().isEmpty().withMessage("The field flightState is empty!"),
    check('company').not().isEmpty().withMessage("The field company is empty!"),
], body('flightCode').isLength({ min: 4, max: 6 }).withMessage("Wrong flight code!"), addFlight);

router.get('/flights/:id', validateId, getFlightById);

router.get('/flights/search/:flightCode', getFlightByParam);

router.get('/flights/search/additional/:code', getAllFlightData);

router.put('/flights/update/:id', validateId, [
    check('flightCode').not().isEmpty().withMessage("The field flightCode is empty"),
    // body('flightCode').isLength({ min: 1000, max: 2000 }).withMessage("Wrong flight code number!"),
    check('from').not().isEmpty().withMessage("The field from is empty"),
    check('to').not().isEmpty().withMessage("The field to is empty"),
    check('date').not().isEmpty().withMessage("The field date is empty"),
    check('flightState').not().isEmpty().withMessage("The field flightState is empty"),
    check('company').not().isEmpty().withMessage("The field company is empty"),
], updateFlight);

router.delete('/flights/delete/:id', validateId, deleteFlight);

// Airports data
router.get('/airports', getAllAirports);

router.post('/add-airport', [
    check('icao_code').not().isEmpty().withMessage("The field icao_code is empty"),
    check('iata_code').not().isEmpty().withMessage("The field iata_code is empty"),
    check('name').not().isEmpty().withMessage("The field name is empty"),
    check('type').not().isEmpty().withMessage("The field type is empty"),
    check('city').not().isEmpty().withMessage("The field city is empty"),
    check('country').not().isEmpty().withMessage("The field country is empty"),
], addAirport);

// the router contains all routes
module.exports = router;
const express = require('express');
const router = express.Router();
const { controllers } = require('../controllers/indexController')
const { validateId } = require('../middlewares/validateId');
const { check, body } = require('express-validator');

router.get('/', controllers.index);

// Flights data
router.get('/flights', controllers.allFlights);

router.post('/add-flight', [
    check('flightCode').not().isEmpty().withMessage("The field flightCode is empty!"),
    check('from').not().isEmpty().withMessage("The field from is empty!"),
    check('to').not().isEmpty().withMessage("The field to is empty!"),
    check('date').not().isEmpty().withMessage("The field date is empty!"),
    check('flightState').not().isEmpty().withMessage("The field flightState is empty!"),
    check('company').not().isEmpty().withMessage("The field company is empty!"),
], body('flightCode').isLength({ min: 4, max: 6 }).withMessage("Wrong flight code!"), controllers.addFlight);

router.get('/flights/:id', validateId, controllers.flightById);

router.get('/flights/search/:flightCode', controllers.flightByParam);

router.get('/flights/search/additional/:code', controllers.allFlightData);

router.put('/flights/update/:id', validateId, [
    check('flightCode').not().isEmpty().withMessage("The field flightCode is empty"),
    check('from').not().isEmpty().withMessage("The field from is empty"),
    check('to').not().isEmpty().withMessage("The field to is empty"),
    check('date').not().isEmpty().withMessage("The field date is empty"),
    check('flightState').not().isEmpty().withMessage("The field flightState is empty"),
    check('company').not().isEmpty().withMessage("The field company is empty"),
], controllers.updateFlight);

router.delete('/flights/delete/:id', validateId, controllers.deleteFlight);

// Airports data
router.get('/airports', controllers.allAirports);

router.post('/add-airport', [
    check('icao_code').not().isEmpty().withMessage("The field icao_code is empty"),
    check('iata_code').not().isEmpty().withMessage("The field iata_code is empty"),
    check('name').not().isEmpty().withMessage("The field name is empty"),
    check('type').not().isEmpty().withMessage("The field type is empty"),
    check('city').not().isEmpty().withMessage("The field city is empty"),
    check('country').not().isEmpty().withMessage("The field country is empty"),
], controllers.addAirport);

// the router contains all routes
module.exports = router;
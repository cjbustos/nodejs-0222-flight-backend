// import express because you need use router
const express = require('express');
const router = express.Router();
const { indexController, viewAll, getFlightById, getFlightByParam, addFlight, updateFlight, deleteFlight, getAllFlightData } = require('../controllers/indexController');
const { validateId } = require('../middlewares/validateId');
const { check, body } = require('express-validator');

router.get('/', indexController);
router.get('/flights', viewAll);

router.post('/add-flight', [
    check('flightCode').not().isEmpty().withMessage("The field flightCode is empty"),
    // body('flightCode').isLength({ min: 1000, max: 2000 }).withMessage("Wrong flight code number!"),
    check('from').not().isEmpty().withMessage("The field from is empty"),
    check('to').not().isEmpty().withMessage("The field to is empty"),
    check('date').not().isEmpty().withMessage("The field date is empty"),
    check('flightState').not().isEmpty().withMessage("The field flightState is empty"),
    check('company').not().isEmpty().withMessage("The field company is empty"),
], addFlight);

router.get('/flights/:id', validateId, getFlightById);

router.get('/flights/search/:flightCode', getFlightByParam);

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

router.get('/flights/airport/:code', getAllFlightData);

// the router contains all routes
module.exports = router;
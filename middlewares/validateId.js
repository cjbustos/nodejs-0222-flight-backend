const { Flight } = require('../models/flights');

const validateId = async (req, res, next) => {

    // return null if not found the id
    const flight = await Flight.findById(req.params.id);

    // next() is not an object, it's a callback
    flight !== null ? next() : res.status(500).json({ msg: "resource not found by this id!" });

}

module.exports = { validateId }
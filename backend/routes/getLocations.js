const Joi = require('joi');
const { Location } = require('../models/location');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    if(req.body.query == "ALL"){
        let all_locations = await Location.find();
        res.send(all_locations);
    }
    else{
        let specific_locations = await Location.find({ CITY: req.body.query });
        res.send(specific_locations);
    }
});

function validate(req) {
    const schema = Joi.object({ query: Joi.string().required(),
    });
    return schema.validate(req);
}

module.exports = router;
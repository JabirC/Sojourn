const Joi = require('joi');
const mongoose = require('mongoose');

const Location = mongoose.model('Location', new mongoose.Schema({
    NAME:{
        type: String,
        required: true
    },
    ADDRESS:{
        type: String,
        required: true
    },
    LATITUDE: {
        type: Number,
        required: true
    },
    LONGITUDE: {
        type: Number,
        required: true
    },
    PRICING: {
        type: Number,
        required: true,
    },
    LOCATION_TYPE: {
        type: String,
        required: true
    },
    CITY:{
        type: String,
        required: true
    }  
}));

function validateLocation(location) {
    const schema = Joi.object({ NAME: Joi.string().required(),
        ADDRESS: Joi.string() .required(),
        LATITUDE: Joi.number() .required(),
        LONGITUDE: Joi.number() .required(),
        PRICING: Joi.number() .required(),
        LOCATION_TYPE: Joi.string() .required(),
        CITY: Joi.string() .required()
    });
    console.log(location);
    return schema.validate(location);
}

exports.Location = Location;
exports.validate = validateLocation;
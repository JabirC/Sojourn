const Joi = require('joi');
const mongoose = require('mongoose');

const Journal = mongoose.model('Journal', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    locationName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 500
    },
    date: {
        type: Date,
        required: true,
    },
    privateEntry: {
        type: Boolean,
        required: true,
    }
}));

function validateJournal(journal) {
    const schema = Joi.object({ username: Joi.string() .min(5) .max(255) .required(),
        locationName: Joi.string() .min(5) .max(255) .required(),
        description: Joi.string() .min(5) .max(500) .required(),
        privateEntry: Joi.boolean() .required()
    });
    
    console.log(journal);
    return schema.validate(journal);
}

exports.Journal = Journal;
exports.validate = validateJournal;
const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
}));

function validateUser(user) {
    const schema = Joi.object({ username: Joi.string() .min(5) .max(255) .required(),
        email: Joi.string() .min(5) .max(255) .required() .email(),
        password: Joi.string() .min(5) .max(255) .required() 
    });
    
    console.log(user);
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
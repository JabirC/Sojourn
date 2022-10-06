const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //  Now find the user by their email address
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).send('Incorrect username or password.');
    }

    // Then validate the Credentials in MongoDB match
    // those provided in the request
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect username or password.');
    }

    const token = jwt.sign({ _id: user._id }, 'PrivateKey');
    res.send(token);
});

function validate(req) {
    const schema = Joi.object({ username: Joi.string() .min(5) .max(255) .required(),
        password: Joi.string() .min(5) .max(255) .required() 
    });

    return schema.validate(req);
}

module.exports = router;
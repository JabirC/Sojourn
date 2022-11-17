const { User} = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).send('User does not exist');
    }

    // Then validate the Credentials in MongoDB match
    // those provided in the request
    if(req.body.password != req.body.passwordConfirmation){
        return res.status(400).send('Passwords do not match');
    }

    const validPassword = await bcrypt.compare(req.body.currentPassword, user.password);
    if (!validPassword) {
        return res.status(400).send('Current Password is Incorrect');
    }

    const isNewPasswordSame = await bcrypt.compare(req.body.password, user.password);
    if(isNewPasswordSame){
        return res.status(400).send('New password cannot be the same as current password')
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
    res.send("Password Reset Successfully");
});

function validate(req) {
    const schema = Joi.object({ username: Joi.string() .min(5) .max(255) .required(),
        currentPassword: Joi.string() .required() .label('currentPassword'),
        password: Joi.string() .min(5) .max(255) .required() .label('new password'),
        passwordConfirmation: Joi.required() .label('Confirm password')
    });

    return schema.validate(req);
}

module.exports = router;
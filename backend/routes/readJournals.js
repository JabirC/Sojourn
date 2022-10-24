const Joi = require('joi');
const { Journal } = require('../models/journal');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let journals = await Journal.find({ username: req.body.username });
    res.send(journals);
});

function validate(req) {
    const schema = Joi.object({ username: Joi.string() .min(5) .max(255) .required(),
    });
    return schema.validate(req);
}

module.exports = router;
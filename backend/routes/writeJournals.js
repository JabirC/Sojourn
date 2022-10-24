const { Journal, validate } = require('../models/journal');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    console.log('made it');

    // Insert the new user if they do not exist yet
    journal = new Journal({
        username: req.body.username,
        locationName: req.body.locationName,
        description: req.body.description,
        date: new Date(),
        privateEntry: req.body.privateEntry
    });
    await journal.save();
    res.send(journal);
});

module.exports = router;
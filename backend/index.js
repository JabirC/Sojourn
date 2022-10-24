const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const journal = require('./routes/writeJournals');
const readJournals= require('./routes/readJournals')
const express = require('express');
const app = express();

mongoose.connect('mongodb+srv://Sojourn:Sojourn@sojourn-userauth.rqxpjrt.mongodb.net/UserAuth')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/journal', journal);
app.use('/api/readJournals', readJournals);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
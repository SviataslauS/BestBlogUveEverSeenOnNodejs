const mongoose = require('mongoose');
const dbHelper = require('../utils/dbHelper');
const seeds = require('./seeds');

module.exports = () => {
    const mongoConnection = dbHelper.connect(mongoose, process.env.MONGO_CONNECTION_STRING);

    seeds();

};

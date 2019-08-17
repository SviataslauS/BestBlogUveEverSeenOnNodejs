const mongoose = require('mongoose');
const dbHelper = require('../utils/dbHelper');
const seeds = require('./seeds');
const envHelper = require('../utils/envVariablesHelper');

module.exports = () => {
    const mongoConnection = dbHelper.connect(mongoose, envHelper.getEnvVariables().MONGO_CONNECTION_STRING);

    seeds.run();
};

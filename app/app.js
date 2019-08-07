require('dotenv').config();

const express = require('express');
const { RoutingUtils } = require('./config/routingUtils');
const { startWorkerJob } = require('./jobs/startWorkerJob');
const dbSetup = require('./config/dbSetup');

const app = express();

RoutingUtils.registerMiddlewares(app);
dbSetup();

// hack for register swagger-tools in callback
setTimeout(() => {
    const http = require('http');
    const server = http.createServer(app);
    const port = process.env.PORT || '3000';
    server.listen(port, () => console.log(`blog is running on port ${port}!`));

    if(process.env.START_JOB) {
        startWorkerJob.start();
    }
}, 0);
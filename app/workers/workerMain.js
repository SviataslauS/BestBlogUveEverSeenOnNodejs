const { Worker } = require('worker_threads');
const path = require('path');
const { WorkerService } = require('../services/workerService');

const startWorker = () => {
    const worker = new Worker(path.join(__dirname, './worker.js'));
    worker.on('message', data => WorkerService.saveStatistic(data));
};

module.exports = { startWorker };

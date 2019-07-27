const { CronJob } = require('cron');
const { startWorker } = require('../workers/workerMain');

const startWorkerJob = new CronJob('* * * * * *', startWorker);

module.exports = { startWorkerJob };

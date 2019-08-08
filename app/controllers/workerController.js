const { WorkerService } = require('../services/workerService');


function getStatisticFromWorker(req, res) {
    const result = WorkerService.getStatistic();
    res.json(result);
}

module.exports = {
    getStatisticFromWorker,
};

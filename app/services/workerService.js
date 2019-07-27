
class WorkerService {
    constructor() {
        this.savingsCount = 0;
        this.statistic = {};
    }

    getStatistic() {
        return this.statistic;    
    }
    
    saveStatistic(data) {
        this.statistic = Object.assign(this.statistic, data);    
        this.savingsCount++;
    }
}

module.exports = {
    WorkerService: new WorkerService(),
};
const _ = require('lodash');
const { entities } = require('../utils/enums');
const EntityService = require('../services/entityService');


class PostService extends EntityService {
  constructor(){
    super(entities.posts);
  }

  getStatistic() {
    const posts = this.getAll().map(item => {	
      item.creationDate = new Date(item.creationDate);	
      return item;	
    });
    const dayInMc = 1000 * 60 * 60 * 24;
    const postsPerDay = this.getStatForPeriod(posts, dayInMc);
    
    const weekInMc = 1000 * 60 * 60 * 24 * 7;
    const postsPerWeek = this.getStatForPeriod(posts, weekInMc);

    const postsPerMonthArray = _.groupBy(posts, function (item) {
      const amountOfMonthsFromMinDate = (item.creationDate.getFullYear() - 1970) * 12 + item.creationDate.getMonth();
      return amountOfMonthsFromMinDate;
    });
    const postsPerMonth = this.getMaxLenghtOfGroupedArr(postsPerMonthArray);

    return {
      postsPerDay,
      postsPerWeek,
      postsPerMonth
    };
  }

  getStatForPeriod(posts, period) {
    const postsPerPeriodArray = _.groupBy(posts, function (item) {
      const ratioForGrouping = Math.floor(item.creationDate.getTime() / period);
      return ratioForGrouping;
    });
    return this.getMaxLenghtOfGroupedArr(postsPerPeriodArray);
  }

  getMaxLenghtOfGroupedArr(groupedArr) {
    let maxLenght = 0;
    Object.entries(groupedArr).forEach(item => {
      if (item && item.length > maxLenght) {
        maxLenght = item.length;
      }
    });
    return maxLenght;
  }
}

module.exports = { PostService: new PostService() };


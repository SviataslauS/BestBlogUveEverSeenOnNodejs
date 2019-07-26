const _ = require('lodash');
const { entities } = require('../utils/enums');
const EntityService = require('../services/entityService');


class PostService extends EntityService {
  constructor(){
    super(entities.posts);
  }

  getStatistic() {
    const posts = this.getAll();

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
    _.each(groupedArr, item => {
      if (item && item.length > maxLenght) {
        maxLenght = item.length;
      }
    });
    return maxLenght;
  }
}

module.exports = { PostService: new PostService() };


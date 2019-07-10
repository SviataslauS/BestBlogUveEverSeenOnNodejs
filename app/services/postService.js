const _ = require('lodash');
const Repository = require('../repository/repository');

class PostService {    
  static getStatistic() {
    const posts = Repository.getAllPosts();

    const dayInMc = 1000 * 60 * 60 * 24;
    const postsPerDay = PostService.getStatForPeriod(posts, dayInMc);
    
    const weekInMc = 1000 * 60 * 60 * 24 * 7;
    const postsPerWeek = PostService.getStatForPeriod(posts, weekInMc);
    
    const postsPerMonthArr = _.groupBy(posts, function (item, val, index) {
      const d = (item.creationDate.getFullYear() - 1970) * 12 + item.creationDate.getMonth();
      return d;
    });
    const postsPerMonth = PostService.getMaxLenghtOfGroupedArr(postsPerMonthArr);

    return {
      postsPerDay,
      postsPerWeek,
      postsPerMonth
    };
  }

  static getStatForPeriod(posts, period) {
    const postsPerPeriodArr = _.groupBy(posts, function (item, val, index) {
      const d = Math.floor(item.creationDate.getTime() / period);
      return d;
    });
    return PostService.getMaxLenghtOfGroupedArr(postsPerPeriodArr);
  }

  static getMaxLenghtOfGroupedArr(groupedArr) {
    let maxLenght = 0;
    _.each(groupedArr, item => {
      if (item && item.length > maxLenght) {
        maxLenght = item.length;
      }
    });
    return maxLenght;
  }
}

module.exports = PostService;


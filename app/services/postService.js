var _ = require('lodash');
var Repository = require('../repository/repository')

class PostService {    
  static getStatistic() {
    var posts = Repository.getAllPosts();

    var dayInMc = 1000 * 60 * 60 * 24;
    var postsPerDay = PostService.getStatForPeriod(posts, dayInMc);
    
    var weekInMc = 1000 * 60 * 60 * 24 * 7;
    var postsPerWeek = PostService.getStatForPeriod(posts, weekInMc);
    
    var postsPerMonthArr = _.groupBy(posts, function (item, val, index) {
      var d = (item.creationDate.getFullYear()-1970)*12 + item.creationDate.getMonth();
      return d;
    });
    var postsPerMonth = PostService.getMaxLenghtOfGroupedArr(postsPerMonthArr);

    return {
      postsPerDay,
      postsPerWeek,
      postsPerMonth
    };
  }

  static getStatForPeriod(posts, period) {
    var postsPerPeriodArr = _.groupBy(posts, function (item, val, index) {
      var d = Math.floor(item.creationDate.getTime() / period);
      return d;
    });
    return PostService.getMaxLenghtOfGroupedArr(postsPerPeriodArr);
  }

  static getMaxLenghtOfGroupedArr(groupedArr) {
    var maxLenght = 0;
    _.each(groupedArr, item => {
      if (item && item.length > maxLenght) {
        maxLenght = item.length;
      }
    });
    return maxLenght;
  }
}

module.exports = PostService;


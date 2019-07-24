const _ = require('lodash');
const { entities } = require('../utils/enums');
const Repository = require('../repository/repository');


const PostRepository = new Repository(entities.posts);

class PostService {
  static getStatistic() {
    const posts = PostService.getAllPosts();

    const dayInMc = 1000 * 60 * 60 * 24;
    const postsPerDay = PostService.getStatForPeriod(posts, dayInMc);
    
    const weekInMc = 1000 * 60 * 60 * 24 * 7;
    const postsPerWeek = PostService.getStatForPeriod(posts, weekInMc);

    const postsPerMonthArray = _.groupBy(posts, function (item) {
      const amountOfMonthsFromMinDate = (item.creationDate.getFullYear() - 1970) * 12 + item.creationDate.getMonth();
      return amountOfMonthsFromMinDate;
    });
    const postsPerMonth = PostService.getMaxLenghtOfGroupedArr(postsPerMonthArray);

    return {
      postsPerDay,
      postsPerWeek,
      postsPerMonth
    };
  }

  static getStatForPeriod(posts, period) {
    const postsPerPeriodArray = _.groupBy(posts, function (item) {
      const ratioForGrouping = Math.floor(item.creationDate.getTime() / period);
      return ratioForGrouping;
    });
    return PostService.getMaxLenghtOfGroupedArr(postsPerPeriodArray);
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

  static getAllPosts() {
    const posts = PostRepository.getAll();
    return posts;
  }

  static getPostById(postId) {
    const posts = PostRepository.getById(postId);
    return posts;
  }

  static updatePost() {
    const posts = PostRepository.update();
    return posts;
  }

  static deletePost() {
    const posts = PostRepository.delete();
    return posts;
  }


}

module.exports = PostService;


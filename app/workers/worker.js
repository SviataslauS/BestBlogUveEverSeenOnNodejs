const { parentPort } = require('worker_threads');
const { PostService } = require('../services/postService');


const postsStatistic = PostService.getStatistic();
parentPort.postMessage({ postsStatistic });

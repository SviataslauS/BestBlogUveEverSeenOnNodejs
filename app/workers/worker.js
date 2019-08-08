const { parentPort } = require('worker_threads');
const { PostService } = require('../services/postService');

PostService.getStatistic()
    .then(postsStatistic => {
        parentPort.postMessage({ postsStatistic });
    })
    .catch(e => {
        console.log(`worker error: ${e}`);
    });
    

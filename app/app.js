var opn = require('opn');
var express = require('express');
const HealthController = require('./controllers/healthController');
const PostsController = require('./controllers/postController');

var app = express();

app.get('/health/ping', HealthController.ping);
    
app.get('/posts/getStatistic', PostsController.getStatistic); // should be post

app.get('/', (req, res) => {
    res.send('It\'s a Blog, motherfucker!');
});


var http = require('http');
var server = http.createServer(app);
var port = process.env.PORT || '3000';
server.listen(port);

opn('http://localhost:3000');
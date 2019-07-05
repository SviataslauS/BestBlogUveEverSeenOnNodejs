var express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send('It\'s a Blog, mothefucker!');
});

var http = require('http');

var server = http.createServer(app);
var port = process.env.PORT || '3000';
server.listen(port);


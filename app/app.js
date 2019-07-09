require('dotenv').config();

const opn = require('opn');
const express = require('express');
const { RoutingUtils } = require('./utils/routingUtils');

const app = express();

RoutingUtils.registerRoutes(app);

const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || '3000';
server.listen(port);

opn('http://localhost:3000');
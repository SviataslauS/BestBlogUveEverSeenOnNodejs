require('dotenv').config();

const express = require('express');
const { RoutingUtils } = require('./utils/routingUtils');

const app = express();

RoutingUtils.registerMiddlewares(app);
RoutingUtils.registerRoutes(app);

const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || '3000';
server.listen(port);
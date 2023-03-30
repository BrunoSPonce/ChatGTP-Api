'use strict';
const config = require('config');
const http = require('http');
const middlewares = require('./app/config/middlewares');

const server = http.createServer(middlewares);

process.setMaxListeners(0);

server.listen(config.get('SERVER').PORT, async () => {
     console.log(`API running on port ${config.get('SERVER').PORT}, environment: ${config.get('ENV')}`);
 });
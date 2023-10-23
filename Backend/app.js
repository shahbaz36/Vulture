const express = require('express');

const zapScanner = require('./utils/zap');
//const zapController = require('./controller/zapController');

const app = express();

app.route('/').get(zapScanner.runZAPScan);

module.exports = app;

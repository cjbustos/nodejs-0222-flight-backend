const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const app = express();
const indexRouter = require('./routes/index');
const connect = require('./db/db');

// configurations
app.use(logger('dev'));
app.use(express.json());
app.use(cors());

// give route component to 'use()' method
app.use('/', indexRouter);
connect();

module.exports = app;
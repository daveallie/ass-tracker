require('dotenv').config({path: __dirname + '/.env'});
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const app = express();

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/', indexRouter);

module.exports = app;

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config({ path: `${__dirname}/../.env` });
const config = require('./config/config');
const indexRouter = require('./routes');
const filesRouter = require('./routes/files');
const globalErrorHandler = require('./helpers/globalErrorHandler');
const noFoundError = require('./helpers/notFoundError');

require('./bootstrap');

const app = express();
app.use(cors());

if (config.app.env === 'development') {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/v1/', indexRouter);
app.use('/v1/files', filesRouter);

app.use(noFoundError);
app.use(globalErrorHandler);
app.listen({ port: config.app.port }, async () => {
  console.info(`listening on port ${config.app.port}`);
});

module.exports = app;

const express = require('express');
var cors = require('cors');
const logger = require('morgan');
require('dotenv').config({ path: `${__dirname}/../.env` });
// const swaggerUi = require('swagger-ui-express');
// const swaggerApiDoc = require('./config/swagger.json');
const config = require('./config/environments');

const indexRouter = require('./routes');
const filesRouter = require('./routes/files');
const globalErrorHandler = require('./helpers/globalErrorHandler');
const noFoundError = require('./helpers/notFoundError');

const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/v1/', indexRouter);
app.use('/v1/files', filesRouter);
// app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerApiDoc));

app.use(noFoundError);
app.use(globalErrorHandler);
app.listen({ port: config.app.port }, async () => {
  console.info(`listening on port ${config.app.port}`);
});

module.exports = app;

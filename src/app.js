const express = require('express');
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config({ path: `${__dirname}/../.env` });
// const swaggerUi = require('swagger-ui-express');
// const swaggerApiDoc = require('./config/swagger.json');
const config = require('./config/config');
const fs = require('fs');

const indexRouter = require('./routes');
const filesRouter = require('./routes/files');
const globalErrorHandler = require('./helpers/globalErrorHandler');
const noFoundError = require('./helpers/notFoundError');
const path = require('path');
const fileDirectory = path.join(__dirname, `../${config.app.folder}`);
fs.mkdir(fileDirectory, { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Directory created successfully for files at: ${fileDirectory}`);
  }
});

require('./utils/unusedFileDelete.scheduler');

const app = express();
app.use(cors());

if (config.app.env === 'development') {
  app.use(logger('dev'));
}
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

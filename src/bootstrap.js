const fs = require('fs');
const path = require('path');

// load configs
const config = require('./config/config');
const fileDirectory = path.join(__dirname, `../${config.app.folder}`);

// create file upload destination directory if it doesn't exist
fs.mkdir(fileDirectory, { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Directory created successfully for files at: ${fileDirectory}`);
  }
});

// start scheduler to delete unused files
require('./utils/unusedFileDelete.scheduler');

const cron = require('node-cron');
const config = require('../config/config');
const { unusedFileDelete } = require('../files/files.service');

const cronTime = config.app.fileCleanupCronTime;

// Schedule cron job to run at the specified time
cron.schedule(cronTime, unusedFileDelete);

const cron = require('node-cron');
const fsPromises = require('fs').promises;
const path = require('path');
const config = require('../config/config');

const directoryPath = path.join(__dirname, `../../${config.app.folder}`);
const cronTime = config.app.fileCleanupCronTime;

// Schedule cron job to run at the specified time
cron.schedule(cronTime, async () => {
  try {
    // Get a list of all files in the directory
    const files = await fsPromises.readdir(directoryPath);

    // Delete each file in the directory
    for (const file of files) {
      await fsPromises.unlink(`${directoryPath}/${file}`);
    }
  } catch (err) {
    console.error(`Error deleting files: ${err}`);
  }
});

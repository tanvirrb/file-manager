const cron = require('node-cron');
const fsPromises = require('fs').promises;
const path = require('path');
const config = require('../config/config');

const directoryPath = path.join(__dirname, `../../${config.app.folder}`);
const cronTime = config.app.fileCleanupCronTime;

// Schedule cron job to run at the specified time
cron.schedule(cronTime, async () => {
  console.info(`Running cron job to delete unused files at: ${directoryPath}`);
  try {
    // Get a list of all files in the directory
    const files = await fsPromises.readdir(directoryPath);
    console.info(`Found ${files.length} files to delete`);

    // Delete each file in the directory
    for (const file of files) {
      await fsPromises.unlink(`${directoryPath}/${file}`);
      console.info(`Deleted file: ${file}`);
    }
  } catch (err) {
    console.error(`Error deleting files: ${err}`);
  }
});

const assert = require('chai').assert;
const fileService = require('./files.service');
const fsPromises = require('fs').promises;
const _p = require('../helpers/asyncWrapper');
const path = require('path');
const config = require('../config/config');
const fs = require('fs');

describe('File service test suit', () => {
  before(async () => {
    const fileDirectory = config.app.folder;
    fs.mkdir(fileDirectory, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.info(`Directory created successfully for file test at: ${fileDirectory}`);
      }
    });
  });

  beforeEach(async () => {
    const fileDirectory = config.app.folder;
    const directoryPath = path.join(__dirname, `../../${fileDirectory}`);
    const files = await fsPromises.readdir(directoryPath);
    for (const file of files) {
      await fsPromises.unlink(`${directoryPath}/${file}`);
    }
  });

  it('should save the publicKey and privateKey files', async () => {
    const files = {
      publicKey: [
        {
          fieldname: 'publicKey',
          originalname: 'public_key.pub',
          buffer: Buffer.from('public_key_file_content'),
          encoding: '7bit',
          mimetype: 'text/plain',
        },
      ],
      privateKey: [
        {
          fieldname: 'privateKey',
          originalname: 'private_key.pem',
          buffer: Buffer.from('private_key_file_content'),
          encoding: '7bit',
          mimetype: 'text/plain',
        },
      ],
    };
    const [err, result] = await _p(fileService.saveFiles(files));

    assert.isNull(err);
    assert.exists(result.publicKey);
    assert.exists(result.privateKey);
  });

  afterEach(async () => {
    const fileDirectory = config.app.folder;
    const directoryPath = path.join(__dirname, `../../${fileDirectory}`);
    const files = await fsPromises.readdir(directoryPath);
    for (const file of files) {
      await fsPromises.unlink(`${directoryPath}/${file}`);
    }
  });
});

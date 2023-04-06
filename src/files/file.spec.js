const assert = require('chai').assert;
const fileService = require('./files.service');
const fsPromises = require('fs').promises;
const _p = require('../helpers/asyncWrapper');
const path = require('path');
const config = require('../config/config');
const fs = require('fs');
const { customAlphabet } = require('nanoid');

const createTestFiles = async (fileId, storageFolder) => {
  const publicKeyPath = path.join(__dirname, `../../${storageFolder}/${fileId}.pub`);
  const privateKeyPath = path.join(__dirname, `../../${storageFolder}/${fileId}.pem`);
  const [publicKeyFileData, privateKeyFileData] = await Promise.allSettled([
    fsPromises.writeFile(publicKeyPath, 'publicKeyContent'),
    fsPromises.writeFile(privateKeyPath, 'privateKeyContent'),
  ]);
  const publicKeyFile = publicKeyFileData.status === 'fulfilled' ? publicKeyFileData.value : null;
  const privateKeyFile =
    privateKeyFileData.status === 'fulfilled' ? privateKeyFileData.value : null;

  return !publicKeyFile && !privateKeyFile;
};

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

  it('should get the publicKey and privateKey files', async () => {
    const fileDirectory = config.app.folder;
    const fileId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8)();
    await createTestFiles(fileId, fileDirectory);

    const [err, result] = await _p(fileService.getFilesByPublicKey(fileId));

    assert.isNull(err);
    assert.exists(result.publicKeyFile);
    assert.exists(result.privateKeyFile);
  });

  it('should delete the publicKey and privateKey files', async () => {
    const fileDirectory = config.app.folder;
    const fileId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8)();
    await createTestFiles(fileId, fileDirectory);

    const [err, result] = await _p(fileService.deleteFilesByPrivateKey(fileId));

    assert.isNull(err);
    assert.exists(result);
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

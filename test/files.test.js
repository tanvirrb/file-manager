const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const app = require('../src/app');
const _p = require('../src/helpers/asyncWrapper');
const path = require('path');
const { customAlphabet } = require('nanoid');
const fsPromises = require('fs').promises;
const config = require('../src/config/config');
const {
  FILE_DELETED: { success },
} = require('../src/config/constants');

chai.use(chaiHttp);

const createTestFiles = async (fileId, storageFolder) => {
  const publicKeyPath = path.join(__dirname, `../${storageFolder}/${fileId}.pub`);
  const privateKeyPath = path.join(__dirname, `../${storageFolder}/${fileId}.pem`);
  const [publicKeyFileData, privateKeyFileData] = await Promise.allSettled([
    fsPromises.writeFile(publicKeyPath, 'publicKeyContent'),
    fsPromises.writeFile(privateKeyPath, 'privateKeyContent'),
  ]);
  const publicKeyFile = publicKeyFileData.status === 'fulfilled' ? publicKeyFileData.value : null;
  const privateKeyFile =
    privateKeyFileData.status === 'fulfilled' ? privateKeyFileData.value : null;

  return !publicKeyFile && !privateKeyFile;
};

describe('File test suit', () => {
  beforeEach(async () => {
    const fileDirectory = config.app.folder;
    const directoryPath = path.join(__dirname, `../${fileDirectory}`);
    const files = await fsPromises.readdir(directoryPath);
    for (const file of files) {
      await fsPromises.unlink(`${directoryPath}/${file}`);
    }
  });

  it('should upload files and return publicKey and privateKey', async () => {
    const [err, data] = await _p(
      chai
        .request(app)
        .post('/v1/files')
        .attach('publicKey', Buffer.from('publicKeyContent'), 'publicKey.pub')
        .attach('privateKey', Buffer.from('privateKeyContent'), 'privateKey.pem')
    );

    assert.isNull(err);
    assert.equal(data.status, 201);
    assert.exists(data.body.publicKey);
    assert.exists(data.body.privateKey);
  });

  it('Should get files by public key', async () => {
    const fileDirectory = config.app.folder;
    const fileId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8)();
    await createTestFiles(fileId, fileDirectory);

    const [err, data] = await _p(chai.request(app).get(`/v1/files/${fileId}`));

    assert.isNull(err);
    assert.equal(data.status, 200);
    assert.exists(data.body.publicKey);
    assert.exists(data.body.privateKey);
  });

  it('Should delete files by private key', async () => {
    const fileDirectory = config.app.folder;
    const fileId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8)();
    await createTestFiles(fileId, fileDirectory);

    const [err, data] = await _p(chai.request(app).delete(`/v1/files/${fileId}`));

    assert.isNull(err);
    assert.equal(data.status, 200);
    assert.exists(data.body.message);
    assert.equal(data.body.message, success);
  });

  afterEach(async () => {
    const fileDirectory = config.app.folder;
    const directoryPath = path.join(__dirname, `../${fileDirectory}`);
    const files = await fsPromises.readdir(directoryPath);
    for (const file of files) {
      await fsPromises.unlink(`${directoryPath}/${file}`);
    }
  });
});

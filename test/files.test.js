const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const app = require('../src/app');
const _p = require('../src/helpers/asyncWrapper');
const path = require('path');
const fsPromises = require('fs').promises;

chai.use(chaiHttp);

describe('File test suit', () => {
  beforeEach(async () => {
    const directoryPath = path.join(__dirname, '../storage');
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

  afterEach(async () => {
    const directoryPath = path.join(__dirname, '../storage');
    const files = await fsPromises.readdir(directoryPath);
    for (const file of files) {
      await fsPromises.unlink(`${directoryPath}/${file}`);
    }
  });
});

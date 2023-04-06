const fsPromises = require('fs').promises;
const { customAlphabet } = require('nanoid');
const path = require('path');

module.exports.saveFiles = async (files) => {
  const fileId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8)();
  const fileData = {};

  for (const [name, fileArray] of Object.entries(files)) {
    for (const file of fileArray) {
      let fileExtension = '';
      if (name === 'publicKey') {
        fileExtension = '.pub';
      } else if (name === 'privateKey') {
        fileExtension = '.pem';
      }

      const fileName = `${fileId}${fileExtension}`;
      const filePath = path.join(__dirname, `../../storage/${fileName}`);
      await fsPromises.writeFile(filePath, file.buffer);

      fileData[name] = fileName;
    }
  }
  return fileData;
};

module.exports.getFilesByPublicKey = async (keyName) => {
  const publicKeyPath = path.join(__dirname, `../../storage/${keyName}.pub`);
  const privateKeyPath = path.join(__dirname, `../../storage/${keyName}.pem`);

  const [publicKeyFileData, privateKeyFileData] = await Promise.allSettled([
    fsPromises.readFile(publicKeyPath, 'utf-8'),
    fsPromises.readFile(privateKeyPath, 'utf-8'),
  ]);

  const publicKeyFile = publicKeyFileData.status === 'fulfilled' ? publicKeyFileData.value : null;
  const privateKeyFile =
    privateKeyFileData.status === 'fulfilled' ? privateKeyFileData.value : null;

  return { publicKeyFile, privateKeyFile };
};

module.exports.deleteFilesByPrivateKey = async (keyName) => {
  const privateKeyPath = path.join(__dirname, `../../storage/${keyName}.pem`);
  const publicKeyPath = path.join(__dirname, `../../storage/${keyName}.pub`);
  const [publicKeyFileData, privateKeyFileData] = await Promise.allSettled([
    fsPromises.unlink(publicKeyPath),
    fsPromises.unlink(privateKeyPath),
  ]);
  const publicKeyFile = publicKeyFileData.status === 'fulfilled' ? publicKeyFileData.value : null;
  const privateKeyFile =
    privateKeyFileData.status === 'fulfilled' ? privateKeyFileData.value : null;

  return publicKeyFile === undefined && privateKeyFile === undefined;
};

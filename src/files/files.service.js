const fsPromises = require('fs').promises;
const { customAlphabet } = require('nanoid');
const path = require('path');
const config = require('../config/config');

/**
 * Saves files to the file system
 * @param files
 * @returns {Promise<{}>}
 */
module.exports.saveFiles = async (files) => {
  const fileDirectory = config.app.folder;
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
      const filePath = path.join(__dirname, `../../${fileDirectory}/${fileName}`);
      await fsPromises.writeFile(filePath, file.buffer);

      fileData[name] = fileName;
    }
  }
  return fileData;
};

/**
 * Gets files from the file system by public key ID
 * @param keyName
 * @returns {Promise<{privateKeyFile: Buffer, publicKeyFile: Buffer}>}
 */
module.exports.getFilesByPublicKey = async (keyName) => {
  const fileDirectory = config.app.folder;
  const publicKeyPath = path.join(__dirname, `../../${fileDirectory}/${keyName}.pub`);
  const privateKeyPath = path.join(__dirname, `../../${fileDirectory}/${keyName}.pem`);

  const [publicKeyFileData, privateKeyFileData] = await Promise.allSettled([
    fsPromises.readFile(publicKeyPath, 'utf-8'),
    fsPromises.readFile(privateKeyPath, 'utf-8'),
  ]);

  const publicKeyFile = publicKeyFileData.status === 'fulfilled' ? publicKeyFileData.value : null;
  const privateKeyFile =
    privateKeyFileData.status === 'fulfilled' ? privateKeyFileData.value : null;

  return { publicKeyFile, privateKeyFile };
};

/**
 * Deletes files from the file system by private key ID
 * @param keyName
 * @returns {Promise<boolean>}
 */
module.exports.deleteFilesByPrivateKey = async (keyName) => {
  const fileDirectory = config.app.folder;
  const privateKeyPath = path.join(__dirname, `../../${fileDirectory}/${keyName}.pem`);
  const publicKeyPath = path.join(__dirname, `../../${fileDirectory}/${keyName}.pub`);

  const [publicKeyFileData, privateKeyFileData] = await Promise.allSettled([
    fsPromises.unlink(publicKeyPath),
    fsPromises.unlink(privateKeyPath),
  ]);

  const publicKeyFile = publicKeyFileData.status === 'fulfilled' ? publicKeyFileData.value : null;
  const privateKeyFile =
    privateKeyFileData.status === 'fulfilled' ? privateKeyFileData.value : null;

  return publicKeyFile === undefined && privateKeyFile === undefined;
};

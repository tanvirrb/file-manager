const fsPromises = require('fs').promises;
const { customAlphabet } = require('nanoid');

async function saveFiles(files) {
  try {
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
        const filePath = `./storage/${fileName}`;
        await fsPromises.writeFile(filePath, file.buffer);

        fileData[name] = fileName;
      }
    }
    console.info('fileData', fileData);
    return fileData;
  } catch (error) {
    console.error(error);
    throw new Error('Error saving files');
  }
}

async function getFiles(publicKey) {
  try {
    const publicKeyPath = `./storage/${publicKey}.pub`;
    const privateKeyPath = `./storage/${publicKey}.pem`;
    console.info('publicKeyPath', publicKeyPath);
    console.info('privateKeyPath', privateKeyPath);

    const publicKeyFile = await fsPromises.readFile(publicKeyPath, 'utf-8');
    const privateKeyFile = await fsPromises.readFile(privateKeyPath, 'utf-8');
    console.info('publicKeyFile', publicKeyFile);
    console.info('privateKeyFile', privateKeyFile);

    return { publicKeyFile, privateKeyFile };
  } catch (error) {
    console.error(error);
    throw new Error('Error retrieving files');
  }
}

module.exports = {
  saveFiles,
  getFiles,
};

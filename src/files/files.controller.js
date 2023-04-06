const {
  FILE_DELETED: { success, failed },
} = require('../config/constants');
const filesService = require('./files.service');

module.exports.uploadFiles = async (req, res, next) => {
  try {
    const { publicKey, privateKey } = await filesService.saveFiles(req.files);

    res.status(201).json({ publicKey, privateKey });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports.getFilesByPublicKey = async (req, res, next) => {
  try {
    const publicKey = req.params.publicKey;
    const { publicKeyFile, privateKeyFile } = await filesService.getFilesByPublicKey(publicKey);

    res.status(200).json({ publicKey: publicKeyFile, privateKey: privateKeyFile });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports.deleteFilesByPrivateKey = async (req, res, next) => {
  const { privateKey } = req.params;
  try {
    const result = await filesService.deleteFilesByPrivateKey(privateKey);
    const message = result ? success : failed;
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

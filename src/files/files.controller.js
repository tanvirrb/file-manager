const filesService = require('./files.service');


module.exports.uploadFiles = async (req, res, next) => {
  try {
    const { publicKey, privateKey } = await filesService.saveFiles(req.files);

    res.status(201).json({ publicKey, privateKey });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports.getFiles = async (req, res, next) => {
  try {
    console.info('req.params', req.params);
    const publicKey = req.params.publicKey;
    const { publicKeyFile, privateKeyFile } = await filesService.getFiles(publicKey);

    res.json({ publicKey: publicKeyFile, privateKey: privateKeyFile });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

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

const express = require('express');
const router = express.Router();
const multer = require('multer');
const fileController = require('../files/files.controller');

// Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { upLoadLimiter, downLoadLimiter } = require('../utils/rateLimiter.middleware');

router.post(
  '/',
  upLoadLimiter,
  upload.fields([
    { name: 'publicKey', maxCount: 1 },
    { name: 'privateKey', maxCount: 1 },
  ]),
  fileController.uploadFiles
);
router.get('/:publicKey', downLoadLimiter, fileController.getFilesByPublicKey);
router.delete('/:privateKey', fileController.deleteFilesByPrivateKey);

module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const fileController = require('../files/files.controller');

// Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  '/',
  upload.fields([
    { name: 'publicKey', maxCount: 1 },
    { name: 'privateKey', maxCount: 1 },
  ]),
  fileController.uploadFiles
);

module.exports = router;

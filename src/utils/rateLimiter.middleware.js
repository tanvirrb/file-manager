const rateLimit = require('express-rate-limit');
const config = require('../config/config');
const {
  RATE_LIMIT: { code, message },
} = require('../config/constants');

module.exports.upLoadLimiter = rateLimit({
  windowMs: 60 * Number(config.app.apiRateLimitUpload), // 1 minute
  max: Number(config.app.requestLimitUpload), // limit each IP to 10 requests per minute
  message: { code, message },
});

module.exports.downLoadLimiter = rateLimit({
  windowMs: 60 * Number(config.app.apiRateLimitDownload), // 1 minute
  max: Number(config.app.requestLimitDownload), // limit each IP to 10 requests per minute
  message: { code, message },
});

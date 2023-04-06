module.exports = {
  app: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development',
    folder: process.env.FOLDER || 'storage',
    apiRateLimitUpload: process.env.API_RATE_LIMIT_UPLOAD || 1000,
    apiRateLimitDownload: process.env.API_RATE_LIMIT_DOWNLOAD || 1000,
    requestLimitUpload: process.env.REQUEST_LIMIT_UPLOAD || 1000,
    requestLimitDownload: process.env.REQUEST_LIMIT_DOWNLOAD || 1000,
  },
};

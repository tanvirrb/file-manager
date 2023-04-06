module.exports = {
  app: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development',
    folder: process.env.FOLDER || 'storage',
  },
};

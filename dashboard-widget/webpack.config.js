const developmentConfig = require('./webpack.dev.js');
const productionConfig = require('./webpack.prod.js');

const environment = process.env.BURST_ENV;

module.exports = environment === 'production' ? productionConfig : developmentConfig;
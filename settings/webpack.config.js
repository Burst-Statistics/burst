const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
  ...defaultConfig,
  output: {
    ...defaultConfig.output,
    filename: '[name].[contenthash]2.js',
    chunkFilename: '[name].[contenthash]2.js',
  },
};
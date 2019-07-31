const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: {
      '/kaizen/api': {
        target: 'http://localhost:3000'
      }
    }
  }
};

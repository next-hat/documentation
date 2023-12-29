module.exports = function (context, options) {
  return {
    configureWebpack(config, isServer, utils) {
      return {
        module: {
          rules: [
            { test: /\.yml$/, use: 'raw-loader' },
          ],
        },
      };
    },
  };
};

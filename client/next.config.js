// This file is automatically loaded by next.js
// If you don't see a change reflected in the browser
// get kube pods and kill the relevant one
module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};

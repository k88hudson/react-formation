var GuidePage = require('../../guide-page.jsx');

module.exports = GuidePage({
  docs: require('../../../README.md'),
  example: require('./example.jsx'),
  code: require('!!raw!./example.jsx')
});


var GuidePage = require('../guide-page.jsx');

module.exports = GuidePage({
  docs: require('./docs.md'),
  example: require('./example.jsx'),
  code: require('!!raw!./example.jsx')
});


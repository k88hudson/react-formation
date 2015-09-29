const GuidePage = require('../../guide-page.jsx');
const req = require.context('../../../src/lib/apiDocs', false, /.md$/);

const docs = req.keys()
  .map(path => require('../../../src/lib/apiDocs' + path.replace('.', '')))
  .join('\n\n');

module.exports = module.exports = GuidePage({
  docs: `<div class="api-docs"><h1>API documentation</h1>\n\n${docs}\n</div>`
});

var React = require('react/addons');
var Highlight = require('react-highlight');
var Markdown = require('react-remarkable')

var Example = require('./example.jsx');
var code = require('!!raw!./example.jsx')
  .replace('../../src/form.jsx', 'react-composable-form')
  .replace('module.exports = Form;', 'React.render(<Form />, document.body);');


var Docs = React.createClass({
  render: function () {
    return (<div className="docs">
      <Markdown source={require('./docs.md')} />

      <h2>Complete Example</h2>
      <div className="example"><Example /></div>
      <Highlight className="javascript">
        {code}
      </Highlight>
    </div>);
  }
});

module.exports = Docs;


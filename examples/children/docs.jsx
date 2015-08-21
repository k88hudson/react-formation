var React = require('react/addons');
var Highlight = require('react-highlight');

var Example = require('./example.jsx');
var code = require('!!raw!./example.jsx')
  .replace('../../src/form.jsx', 'react-composable-forms')
  .replace('\nmodule.exports = Form;', '');

var Docs = React.createClass({
  render: function () {
    return (<div>
      <Example />
      <Highlight className="javascript">
        {code}
      </Highlight>
    </div>);
  }
});

module.exports = Docs;


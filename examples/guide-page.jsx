var React = require('react/addons');
var Highlight = require('react-highlight');
var Markdown = require('react-remarkable')

module.exports = function(options) {
  return React.createClass({
    render: function () {

      var Example = options.example;
      var code = options.code
        .replace('../../src/form.jsx', 'react-composable-form')
        .replace('module.exports = Form;', 'React.render(<Form />, document.body);');

      return (<div className="docs">

        <div className="markdown"><Markdown source={options.docs} /></div>

        <h2>Complete Example</h2>
        <div className="example"><Example /></div>
        <Highlight className="javascript">
          {code}
        </Highlight>
      </div>);
    }
  });
}


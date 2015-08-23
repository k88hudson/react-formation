var React = require('react/addons');
var Highlight = require('react-highlight');
var Markdown = require('./lib/Remarkable.jsx');
// var hljs = require('highlight.js');
var PrismCode = require('./lib/Prism.jsx');

module.exports = function(options) {
  return React.createClass({
    render: function () {

      var Example = options.example;
      var code = options.code
        .replace('../../src/form', 'react-composable-form')
        .replace('module.exports = Form;', 'React.render(<Form />, document.body);');

      return (<div className="docs">

        <div className="markdown"><Markdown prism source={options.docs} /></div>

        <h2>Complete Example</h2>
        <div className="example"><Example /></div>
        <PrismCode className="language-jsx">
          {code}
        </PrismCode>
      </div>);
    }
  });
}

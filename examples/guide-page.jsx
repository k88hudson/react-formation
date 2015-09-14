var React = require('react/addons');
var {Markdown} = require('react-markdocs');
// var hljs = require('highlight.js');
var PrismCode = require('./lib/Prism.jsx');

module.exports = function(options) {
  return React.createClass({
    renderExample: function () {
      var Example = options.example;
      var code = options.code
        .replace('../../src/form', 'react-formation')
        .replace('module.exports = Form;', 'React.render(<Form />, document.body);');

      return (<div>
        <h2>Complete Example</h2>
        <div className="example"><Example /></div>
        <PrismCode className="language-jsx">
          {code}
        </PrismCode>
      </div>);
    },
    render: function () {
      return (<div className="docs">
        <div className="markdown"><Markdown prism source={options.docs} options={{html: true}}/></div>
        {options.example && options.code && this.renderExample()}
      </div>);
    }
  });
}

var React = require('react/addons');
var Highlight = require('react-highlight');
var Markdown = require('react-remarkable');
// var hljs = require('highlight.js');
var PrismCode = require('./lib/Prism.jsx');

module.exports = function(options) {
  return React.createClass({
    render: function () {

      var Example = options.example;
      var code = options.code
        .replace('../../src/form', 'react-composable-form')
        .replace('module.exports = Form;', 'React.render(<Form />, document.body);');

        var highlight = function (str, lang) {

          try {
            return window.Prism.highlight(str, lang && window.Prism.languages[lang]);
          } catch (err) {
            console.log(err);
          }
          return '';
        };

      return (<div className="docs">

        <div className="markdown"><Markdown source={options.docs} options={{highlight}} /></div>

        <h2>Complete Example</h2>
        <div className="example"><Example /></div>
        <PrismCode className="language-jsx">
          {code}
        </PrismCode>
      </div>);
    }
  });
}

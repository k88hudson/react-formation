var React = require('react/addons');
var Highlight = require('react-highlight');
var Markdown = require('react-remarkable');
var hljs = require('highlight.js');

module.exports = function(options) {
  return React.createClass({
    render: function () {

      var Example = options.example;
      var code = options.code
        .replace('../../src/form.jsx', 'react-composable-form')
        .replace('module.exports = Form;', 'React.render(<Form />, document.body);');

        var highlight = function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(lang, str).value;
            } catch (err) {}
          }

          try {
            return hljs.highlightAuto(str).value;
          } catch (err) {}

          return ''; // use external default escaping
        };

      return (<div className="docs">

        <div className="markdown"><Markdown source={options.docs} options={{highlight}} /></div>

        <h2>Complete Example</h2>
        <div className="example"><Example /></div>
        <Highlight className="javascript">
          {code}
        </Highlight>
      </div>);
    }
  });
}

